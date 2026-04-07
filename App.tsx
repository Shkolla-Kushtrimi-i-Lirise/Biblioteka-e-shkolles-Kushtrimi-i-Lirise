
import React, { useState, useEffect } from 'react';
import { Book, ViewState, LoginSession, SentEmail, Theme } from './types';
import { INITIAL_BOOKS } from './initialBooks';
import Sidebar from './components/Sidebar';
import BookCard from './components/BookCard';
import BookDetails from './components/BookDetails';
import AdminPanel from './components/AdminPanel';
import LoginPage from './components/LoginPage';
import InboxPanel from './components/InboxPanel';
import SettingsPanel from './components/SettingsPanel';

const THEMES: Theme[] = [
  {
    id: 'sakura-original',
    name: 'Sakura Tradicionale',
    primary: '#ec13a4',
    bg: '#fdfaf6',
    secondaryBg: '#f5f2ed',
    ink: '#2d2a2e',
    accent: '#ec13a4'
  },
  {
    id: 'ao-daidai',
    name: 'Ao & Daidai (Blu & Portokalli)',
    primary: '#0f4c81',
    bg: '#fcfaf2',
    secondaryBg: '#f5f0e1',
    ink: '#1a1a1b',
    accent: '#f06c00'
  },
  {
    id: 'kurenai',
    name: 'Kurenai (E Kuqe & E Zezë)',
    primary: '#bc002d',
    bg: '#ffffff',
    secondaryBg: '#f0f0f0',
    ink: '#1a1a1a',
    accent: '#000000'
  },
  {
    id: 'fuji-lavender',
    name: 'Fuji & Sakura (Vjollcë & Rozë)',
    primary: '#a55af9',
    bg: '#f8f9fa',
    secondaryBg: '#f0f1f4',
    ink: '#2d2a2e',
    accent: '#ffb7c5'
  },
  {
    id: 'sumie',
    name: 'Sumi-e (Bojë e Zezë & Letër)',
    primary: '#2b2b2b',
    bg: '#fdfdfd',
    secondaryBg: '#f2f2f2',
    ink: '#121212',
    accent: '#8e8e8e'
  }
];

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('biblioteka_theme_id');
    if (saved) {
      const found = THEMES.find(t => t.id === saved);
      if (found) return found;
    }
    return THEMES[0];
  });

  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem('biblioteka_books');
    const version = localStorage.getItem('biblioteka_books_version');
    const CURRENT_VERSION = '2.0';
    
    if (saved && version === CURRENT_VERSION) {
      return JSON.parse(saved);
    }
    
    localStorage.setItem('biblioteka_books_version', CURRENT_VERSION);
    return INITIAL_BOOKS;
  });
  
  const [borrowedBookIds, setBorrowedBookIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('biblioteka_borrowed_ids');
    return saved ? JSON.parse(saved) : [];
  });

  const [loginHistory, setLoginHistory] = useState<LoginSession[]>(() => {
    const saved = localStorage.getItem('biblioteka_login_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [sentEmails, setSentEmails] = useState<SentEmail[]>(() => {
    const saved = localStorage.getItem('biblioteka_sent_emails');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('biblioteka_admin_active') === 'true';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('Të gjitha');
  const [sortBy, setSortBy] = useState<'title' | 'author' | 'rating'>('title');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [view, setView] = useState<ViewState>(() => {
    return localStorage.getItem('biblioteka_admin_active') === 'true' ? 'HOME' : 'LOGIN';
  });
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('biblioteka_theme_id', theme.id);
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-bg', theme.bg);
    root.style.setProperty('--color-secondary-bg', theme.secondaryBg);
    root.style.setProperty('--color-ink', theme.ink);
    root.style.setProperty('--color-accent', theme.accent);
    root.style.setProperty('--color-primary-faint', `${theme.primary}1A`);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('biblioteka_books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('biblioteka_borrowed_ids', JSON.stringify(borrowedBookIds));
  }, [borrowedBookIds]);

  useEffect(() => {
    localStorage.setItem('biblioteka_login_history', JSON.stringify(loginHistory));
  }, [loginHistory]);

  useEffect(() => {
    localStorage.setItem('biblioteka_sent_emails', JSON.stringify(sentEmails));
  }, [sentEmails]);

  useEffect(() => {
    localStorage.setItem('biblioteka_admin_active', isAdmin.toString());
  }, [isAdmin]);

  const handleAddBook = (newBook: Book) => {
    setBooks(prev => [newBook, ...prev]);
    setNotification('Libri u shtua me sukses në koleksion.');
  };

  const handleRemoveBook = (bookId: string) => {
    if (!isAdmin) return;
    setBooks(prev => prev.filter(b => b.id !== bookId));
    setBorrowedBookIds(prev => prev.filter(id => id !== bookId));
    if (selectedBook?.id === bookId) setSelectedBook(null);
    setNotification('Libri u fshi me sukses nga koleksioni.');
  };

  const handleBorrow = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    const isAlreadyBorrowed = borrowedBookIds.includes(bookId);

    if (isAlreadyBorrowed) {
      setBooks(prev => prev.map(b => b.id === bookId ? { ...b, stock: b.stock + 1 } : b));
      setBorrowedBookIds(prev => prev.filter(id => id !== bookId));
      setNotification(`Libri u kthye me sukses. Faleminderit!`);
    } else {
      if (book.stock > 0) {
        setBooks(prev => prev.map(b => b.id === bookId ? { ...b, stock: b.stock - 1 } : b));
        setBorrowedBookIds(prev => [...prev, bookId]);
        setNotification(`U huazua me sukses: ${book.title}`);
        
        const newEmail: SentEmail = {
          id: Date.now().toString(),
          recipient: "përdoruesi@biblioteka.al",
          subject: "Konfirmim i Huazimit të Librit",
          bookTitle: book.title,
          content: `Ju keni huazuar librin "${book.title}". Ju lutemi ta ktheni brenda 7 ditësh për të shmangur gjobat.`,
          timestamp: new Date().toLocaleString('sq-AL'),
        };
        setSentEmails(prev => [newEmail, ...prev]);
        setNotification(`Konfirmimi u dërgua! Kthejeni librin brenda 7 ditësh.`);
      } else {
        setNotification(`Më vjen keq, ky libër nuk është në gjendje.`);
      }
    }
  };

  const filteredBooks = books
    .filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === 'Të gjitha' || book.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'author') return a.author.localeCompare(b.author);
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const genres = ['Të gjitha', ...new Set(books.map(b => b.genre))];

  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleLogin = (success: boolean, userData?: any) => {
    if (success) {
      const newSession: LoginSession = {
        id: Date.now().toString(),
        user: userData?.name || 'admin',
        timestamp: new Date().toLocaleString('sq-AL'),
      };
      setLoginHistory(prev => [newSession, ...prev]);
      setIsAdmin(userData ? false : true); // If Google login, not necessarily admin
      setCurrentUser(userData);
      setView('HOME');
      if (userData) {
        setNotification(`Mirë se vini, ${userData.name}! Të dhënat tuaja u regjistruan.`);
      }
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setView('LOGIN');
  };

  if (view === 'LOGIN' && !isAdmin) {
    return <LoginPage onClose={() => setView('HOME')} onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen overflow-hidden selection:bg-primary/20">
      <Sidebar 
        currentView={view} 
        onViewChange={setView} 
        isAdmin={isAdmin}
        onLoginClick={() => setView('LOGIN')}
        onLogout={handleLogout}
        genres={Array.from(new Set(INITIAL_BOOKS.map(b => b.genre)))}
        authors={Array.from(new Set(INITIAL_BOOKS.map(b => b.author)))}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />

      <main className="flex-1 overflow-y-auto p-8 md:p-12 relative scroll-smooth">
        <header className="mb-12 flex justify-between items-start">
          <div>
            <h2 className="text-4xl font-light text-ink tracking-tight">
              {view === 'HOME' ? 'Koleksioni ynë' : 
               view === 'ADMIN' ? 'Paneli i Kontrollit' : 
               view === 'INBOX' ? 'Kutia e Mesazheve' : 'Cilësimet e Sistemit'}
            </h2>
            <p className="text-primary/60 italic mt-1 font-medium">
              {view === 'HOME' 
                ? `Duke shfaqur ${books.length} vepra të kuruara` 
                : view === 'ADMIN' ? 'Menaxhoni katalogun dhe stafin' : 
                  view === 'INBOX' ? 'Mesazhet e dërguara automatikisht' : 'Personalizoni pamjen e bibliotekës'}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
            <span className="material-icons text-primary text-xs">sync</span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-primary">Të dhënat ruhen lokalisht</span>
          </div>
        </header>

        {view === 'HOME' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredBooks.map(book => (
              <BookCard 
                key={book.id} 
                book={book} 
                isBorrowed={borrowedBookIds.includes(book.id)}
                isSelected={selectedBook?.id === book.id}
                onClick={() => setSelectedBook(book)} 
              />
            ))}
          </div>
        )}

        {view === 'ADMIN' && (
          <AdminPanel 
            onAddBook={handleAddBook} 
            loginHistory={loginHistory} 
            books={books} 
            onRemoveBook={handleRemoveBook} 
          />
        )}

        {view === 'INBOX' && (
          <InboxPanel emails={sentEmails} />
        )}

        {view === 'SETTINGS' && (
          <SettingsPanel currentTheme={theme} themes={THEMES} onThemeSelect={setTheme} />
        )}

        {notification && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-white border border-primary/20 shadow-2xl p-6 rounded-xl max-w-md animate-bounce">
            <div className="flex items-start gap-4">
              <span className="material-icons text-primary">mark_email_read</span>
              <div>
                <p className="text-sm font-medium text-ink">{notification}</p>
                <button 
                  onClick={() => setNotification(null)}
                  className="text-xs text-primary mt-2 font-bold uppercase tracking-widest hover:underline"
                >
                  Mbyll
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {selectedBook && (
        <BookDetails 
          book={books.find(b => b.id === selectedBook.id) || selectedBook} 
          isBorrowed={borrowedBookIds.includes(selectedBook.id)}
          isAdmin={isAdmin}
          onClose={() => setSelectedBook(null)}
          onBorrow={() => handleBorrow(selectedBook.id)}
          onRemove={() => handleRemoveBook(selectedBook.id)}
        />
      )}
    </div>
  );
};

export default App;
