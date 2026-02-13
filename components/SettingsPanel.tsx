
import React from 'react';
import { Theme } from '../types';

interface SettingsPanelProps {
  currentTheme: Theme;
  themes: Theme[];
  onThemeSelect: (theme: Theme) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ currentTheme, themes, onThemeSelect }) => {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom duration-700">
      <div className="bg-white/60 backdrop-blur-xl p-10 rounded-3xl border border-primary/10 shadow-xl">
        <div className="flex items-center gap-3 mb-10">
          <span className="material-icons text-primary">palette</span>
          <h3 className="text-2xl font-bold">Personalizimi i Temës</h3>
        </div>

        <p className="text-ink/60 mb-8 italic">Zgjidhni një nga temat tona elegante të frymëzuara nga estetika japoneze për të ndryshuar përvojën tuaj të shfletimit.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onThemeSelect(theme)}
              className={`group relative p-6 rounded-2xl border transition-all text-left flex flex-col gap-4 ${
                currentTheme.id === theme.id 
                  ? 'border-primary ring-2 ring-primary/20 bg-primary/5' 
                  : 'border-primary/10 hover:border-primary/30 bg-white/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-sm font-bold tracking-tight ${currentTheme.id === theme.id ? 'text-primary' : 'text-ink'}`}>
                  {theme.name}
                </span>
                {currentTheme.id === theme.id && (
                  <span className="material-icons text-primary text-sm">check_circle</span>
                )}
              </div>

              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full shadow-inner" style={{ backgroundColor: theme.bg }}></div>
                <div className="w-8 h-8 rounded-full shadow-inner" style={{ backgroundColor: theme.primary }}></div>
                <div className="w-8 h-8 rounded-full shadow-inner" style={{ backgroundColor: theme.accent }}></div>
                <div className="w-8 h-8 rounded-full shadow-inner" style={{ backgroundColor: theme.ink }}></div>
              </div>

              <div className="mt-2 space-y-1">
                <div className="h-1 w-2/3 bg-primary/20 rounded-full"></div>
                <div className="h-1 w-1/2 bg-primary/10 rounded-full"></div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 p-6 bg-vintage-beige/50 rounded-2xl border border-primary/5">
          <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-ink/40 mb-2">Informacion</h4>
          <p className="text-sm italic text-ink/60 leading-relaxed">
            Ndryshimet e temës ruhen automatikisht në shfletuesin tuaj. Çdo temë është kuruar për të ruajtur lexueshmërinë maksimale dhe elegancën e "Bibliotekës".
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
