
import React from 'react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  isAdmin: boolean;
  currentUser: any;
  onLoginClick: () => void;
  onLogout: () => void;
  genres: string[];
  authors: string[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  onViewChange, 
  isAdmin, 
  currentUser,
  onLoginClick,
  onLogout,
  genres,
  authors,
  searchQuery,
  setSearchQuery,
  selectedGenre,
  setSelectedGenre
}) => {
  return (
    <aside className="w-72 h-screen border-r border-primary/10 flex flex-col p-8 bg-white/40 backdrop-blur-md z-40">
      <div className="mb-12 flex flex-col items-start gap-2">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-2 shadow-inner">
           <span className="material-icons text-3xl">auto_stories</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold italic tracking-tighter text-primary">Biblioteka</h1>
          <p className="text-[10px] uppercase tracking-widest text-primary/60 mt-1 font-bold">Arkiva Digjitale</p>
        </div>
      </div>

      <nav className="flex-1 space-y-10 overflow-y-auto pr-2">
        <div className="relative mb-6">
          <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-primary/40 text-sm">search</span>
          <input 
            type="text" 
            placeholder="Kërko libër ose autor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-primary/5 border border-primary/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-primary/30"
          />
        </div>

        <div>
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-primary/40 mb-4 font-bold">Navigimi</h3>
          <ul className="space-y-3">
            <li>
              <button 
                onClick={() => onViewChange('HOME')}
                className={`text-lg transition-colors flex items-center gap-2 group w-full text-left ${currentView === 'HOME' ? 'text-primary font-medium' : 'text-ink/70 hover:text-primary'}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full transition-colors ${currentView === 'HOME' ? 'bg-primary' : 'bg-primary/20 group-hover:bg-primary'}`}></span>
                Ballina
              </button>
            </li>
            {isAdmin && (
              <>
                <li>
                  <button 
                    onClick={() => onViewChange('ADMIN')}
                    className={`text-lg transition-colors flex items-center gap-2 group w-full text-left ${currentView === 'ADMIN' ? 'text-primary font-medium' : 'text-ink/70 hover:text-primary'}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full transition-colors ${currentView === 'ADMIN' ? 'bg-primary' : 'bg-primary/20 group-hover:bg-primary'}`}></span>
                    Menaxhimi
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onViewChange('INBOX')}
                    className={`text-lg transition-colors flex items-center gap-2 group w-full text-left ${currentView === 'INBOX' ? 'text-primary font-medium' : 'text-ink/70 hover:text-primary'}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full transition-colors ${currentView === 'INBOX' ? 'bg-primary' : 'bg-primary/20 group-hover:bg-primary'}`}></span>
                    Kutia e Postës
                  </button>
                </li>
              </>
            )}
             <li>
              <button 
                onClick={() => onViewChange('SETTINGS')}
                className={`text-lg transition-colors flex items-center gap-2 group w-full text-left ${currentView === 'SETTINGS' ? 'text-primary font-medium' : 'text-ink/70 hover:text-primary'}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full transition-colors ${currentView === 'SETTINGS' ? 'bg-primary' : 'bg-primary/20 group-hover:bg-primary'}`}></span>
                Cilësimet
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-primary/40 mb-4 font-bold">Zhanret</h3>
          <ul className="space-y-3">
            <li>
              <button 
                onClick={() => setSelectedGenre('Të gjitha')}
                className={`text-lg transition-colors flex items-center gap-2 group w-full text-left ${selectedGenre === 'Të gjitha' ? 'text-primary font-medium' : 'text-ink/70 hover:text-primary'}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full transition-colors ${selectedGenre === 'Të gjitha' ? 'bg-primary' : 'bg-primary/20 group-hover:bg-primary'}`}></span>
                Të gjitha
              </button>
            </li>
            {genres.map(genre => (
              <li key={genre}>
                <button 
                  onClick={() => setSelectedGenre(genre)}
                  className={`text-lg transition-colors flex items-center gap-2 group w-full text-left ${selectedGenre === genre ? 'text-primary font-medium' : 'text-ink/70 hover:text-primary'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full transition-colors ${selectedGenre === genre ? 'bg-primary' : 'bg-primary/20 group-hover:bg-primary'}`}></span>
                  {genre}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="mt-auto pt-8 border-t border-primary/5">
        {!isAdmin && !currentUser ? (
          <button 
            onClick={onLoginClick}
            className="flex items-center gap-3 text-sm font-bold text-primary/70 hover:text-primary uppercase tracking-widest"
          >
            <span className="material-icons text-sm">lock_open</span> Identifikohu
          </button>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                {isAdmin ? 'A' : (currentUser?.name?.[0] || 'S')}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-ink truncate">{isAdmin ? 'Administrator' : currentUser?.name}</p>
                <p className="text-[10px] text-ink/40 uppercase tracking-widest">{isAdmin ? 'Staf' : 'Student'}</p>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="flex items-center gap-3 text-sm font-bold text-red-500 hover:text-red-600 uppercase tracking-widest"
            >
              <span className="material-icons text-sm">power_settings_new</span> Çkyçu
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
