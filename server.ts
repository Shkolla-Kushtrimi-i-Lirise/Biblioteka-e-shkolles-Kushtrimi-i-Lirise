import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/callback'
);

// Google Docs ID from the user's link
const DOC_ID = '1uVRMtg9hrjBir5vNxU7TCLlOOvzOQOhULckNbUn7BSA';
// Google Drive Folder ID from the user's link
const FOLDER_ID = '1YBkDSOd4xafbcq3K7CeQdmyxtNuZ9bHR';

// Helper to get Google Auth for Service Account (to write to the specific doc)
function getServiceAccountAuth() {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY) {
    console.warn('Google Service Account credentials missing. Writing to Doc will fail.');
    return null;
  }
  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/documents', 'https://www.googleapis.com/auth/drive.file']
  });
}

// API Routes
app.get('/api/auth/url', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
    prompt: 'consent'
  });
  res.json({ url });
});

app.get(['/auth/callback', '/auth/callback/'], async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);

    // Get user info
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();

    const userData = {
      name: userInfo.data.name,
      email: userInfo.data.email,
      timestamp: new Date().toISOString()
    };

    // Append to Google Doc using Service Account
    const auth = getServiceAccountAuth();
    if (auth) {
      const docs = google.docs({ version: 'v1', auth });
      const drive = google.drive({ version: 'v3', auth });

      // 1. Append text to Doc
      await docs.documents.batchUpdate({
        documentId: DOC_ID,
        requestBody: {
          requests: [
            {
              insertText: {
                location: { index: 1 },
                text: `\nSign-in: ${userData.name} (${userData.email}) at ${userData.timestamp}\n`
              }
            }
          ]
        }
      });

      // 2. Ensure file is in the correct folder (optional if already there, but user asked for it)
      // We can check if it's in the folder and add it if not
      try {
        await drive.files.update({
          fileId: DOC_ID,
          addParents: FOLDER_ID,
          fields: 'id, parents'
        });
      } catch (driveError) {
        console.error('Error moving file to folder:', driveError);
      }
    }

    res.send(`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ 
                type: 'OAUTH_AUTH_SUCCESS', 
                user: ${JSON.stringify(userData)} 
              }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
          <p>Hyrja u krye me sukses! Kjo dritare do të mbyllet automatikisht.</p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('OAuth error:', error);
    res.status(500).send('Authentication failed');
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
