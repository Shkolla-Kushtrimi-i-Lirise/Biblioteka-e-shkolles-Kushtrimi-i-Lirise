
import React, { useState } from 'react';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (success: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === '123admin') {
      onLogin(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-2xl relative border border-primary/10">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-ink/40 hover:text-primary transition-colors"
        >
          <span className="material-icons">close</span>
        </button>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold italic text-primary mb-2">Curator Access</h2>
          <p className="text-sm text-ink/40 uppercase tracking-widest font-bold">Please authenticate to manage library</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest font-bold text-ink/40 ml-1">Username</label>
            <input 
              required
              className="w-full bg-vintage-beige/50 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 italic" 
              placeholder="admin"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest font-bold text-ink/40 ml-1">Password</label>
            <input 
              required
              type="password"
              className="w-full bg-vintage-beige/50 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 italic" 
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs font-bold text-center animate-bounce">Invalid credentials. Access denied.</p>
          )}

          <button 
            type="submit"
            className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-primary/20 uppercase tracking-[0.2em]"
          >
            Authenticate
          </button>
        </form>

        <p className="text-[9px] text-ink/30 text-center mt-8 uppercase tracking-widest">
          Hint: admin / 123admin
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
