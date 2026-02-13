
import React from 'react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  isAdmin: boolean;
  onLoginClick: () => void;
  onLogout: () => void;
  genres: string[];
  authors: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  onViewChange, 
  isAdmin, 
  onLoginClick,
  onLogout,
  genres,
  authors
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
            {genres.slice(0, 4).map(genre => (
              <li key={genre}>
                <button className="text-lg text-ink/70 hover:text-primary transition-colors flex items-center gap-2 group w-full text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/10 group-hover:bg-primary transition-colors"></span>
                  {genre}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="mt-auto pt-8 border-t border-primary/5">
        {!isAdmin ? (
          <button 
            onClick={onLoginClick}
            className="flex items-center gap-3 text-sm font-bold text-primary/70 hover:text-primary uppercase tracking-widest"
          >
            <span className="material-icons text-sm">lock_open</span> Hyr si Admin
          </button>
        ) : (
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 text-sm font-bold text-red-500 hover:text-red-600 uppercase tracking-widest"
          >
            <span className="material-icons text-sm">power_settings_new</span> Çkyçu
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
