
import React, { useState, useEffect } from 'react';

interface LoginPageProps {
  onClose: () => void;
  onLogin: (success: boolean, userData?: any) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onClose, onLogin }) => {
  const [loginType, setLoginType] = useState<'STUDENT' | 'ADMIN'>('STUDENT');
  const [studentName, setStudentName] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        onLogin(true, event.data.user);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onLogin]);

  const handleGoogleLogin = async () => {
    try {
      const response = await fetch('/api/auth/url');
      const { url } = await response.json();
      window.open(url, 'google_oauth', 'width=500,height=600');
    } catch (err) {
      console.error('Failed to get auth URL', err);
    }
  };

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === '123admin') {
      try {
        await fetch('/api/record-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: 'Administrator', email: 'admin@biblioteka.com' })
        });
      } catch (err) {
        console.error('Failed to record admin login', err);
      }
      onLogin(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (studentName.trim() && studentPassword.trim()) {
      const studentData = { name: studentName, email: 'manual@student.com' };
      try {
        await fetch('/api/record-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(studentData)
        });
      } catch (err) {
        console.error('Failed to record student login', err);
      }
      onLogin(true, studentData);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-beige p-4 md:p-8">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-primary/10 animate-in zoom-in-95 duration-500">
        <div className="relative hidden md:block bg-primary p-12 overflow-hidden">
          <div className="absolute inset-0 abstract-art-bg opacity-30 grayscale brightness-150"></div>
          <div className="relative h-full flex flex-col justify-between z-10">
            <div>
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-6 backdrop-blur-md shadow-lg">
                 <span className="material-icons text-3xl">auto_stories</span>
              </div>
              <h1 className="text-5xl font-bold italic text-white tracking-tighter leading-none">Biblioteka</h1>
              <p className="text-white/70 text-sm uppercase tracking-[0.3em] font-bold mt-4">Sistemi i Kurimit</p>
            </div>
            <div className="text-white/90 italic text-xl leading-relaxed max-w-xs">
              "Libri është një kopsht që e mban në xhep."
              <br />
              <span className="not-italic font-bold text-[10px] uppercase tracking-[0.3em] block mt-4 opacity-50">— Proverbë Popullore</span>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 flex flex-col justify-center relative bg-white overflow-y-auto max-h-[90vh]">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-3xl font-bold text-ink mb-2 tracking-tight">Mirë se vini</h2>
            <p className="text-ink/40 text-sm italic">Hyrja për studentët dhe stafin.</p>
          </div>

          <div className="space-y-6">
            <div className="flex bg-primary/5 p-1 rounded-xl">
              <button 
                onClick={() => setLoginType('STUDENT')}
                className={`flex-1 py-2 text-[10px] uppercase tracking-widest font-bold rounded-lg transition-all ${loginType === 'STUDENT' ? 'bg-white text-primary shadow-sm' : 'text-primary/40 hover:text-primary/60'}`}
              >
                Student
              </button>
              <button 
                onClick={() => setLoginType('ADMIN')}
                className={`flex-1 py-2 text-[10px] uppercase tracking-widest font-bold rounded-lg transition-all ${loginType === 'ADMIN' ? 'bg-white text-primary shadow-sm' : 'text-primary/40 hover:text-primary/60'}`}
              >
                Staf / Admin
              </button>
            </div>

            {loginType === 'STUDENT' ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="space-y-4">
                  <button 
                    onClick={handleGoogleLogin}
                    className="w-full py-4 bg-white border-2 border-primary/20 text-ink rounded-xl font-bold hover:bg-primary/5 transition-all flex items-center justify-center gap-3 shadow-sm group"
                  >
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Hyr me Google
                  </button>
                </div>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-primary/10"></div>
                  <span className="flex-shrink mx-4 text-[10px] uppercase tracking-widest font-bold text-ink/20 text-center">ose</span>
                  <div className="flex-grow border-t border-primary/10"></div>
                </div>

                <form onSubmit={handleStudentSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-ink/40 ml-1">Emri i Studentit</label>
                    <input 
                      required
                      className="w-full bg-vintage-beige/40 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 italic transition-all" 
                      placeholder="Emri juaj"
                      value={studentName}
                      onChange={e => setStudentName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-ink/40 ml-1">Fjalëkalimi</label>
                    <input 
                      required
                      type="password"
                      className="w-full bg-vintage-beige/40 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 italic transition-all" 
                      placeholder="••••••••"
                      value={studentPassword}
                      onChange={e => setStudentPassword(e.target.value)}
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-5 bg-primary text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-primary/30 active:scale-95 transition-all uppercase tracking-[0.2em] shadow-lg"
                  >
                    Hyr si Student
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <form onSubmit={handleAdminSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-ink/40 ml-1">Emri i Përdoruesit</label>
                    <input 
                      required
                      className="w-full bg-vintage-beige/40 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 italic transition-all" 
                      placeholder="admin"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-ink/40 ml-1">Fjalëkalimi</label>
                    <input 
                      required
                      type="password"
                      className="w-full bg-vintage-beige/40 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 italic transition-all" 
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-5 bg-primary text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-primary/30 active:scale-95 transition-all uppercase tracking-[0.2em] shadow-lg"
                  >
                    Hyr si Admin
                  </button>
                </form>
              </div>
            )}

            {error && (
              <p className="text-red-500 text-xs font-bold text-center animate-shake">Të dhënat janë të pasakta. Provoni përsëri.</p>
            )}
          </div>

          <div className="mt-12 pt-8 border-t border-primary/5 flex items-center justify-center">
             <span className="text-[10px] text-ink/20 uppercase tracking-widest font-medium">© 2024 Biblioteka Digjitale</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
