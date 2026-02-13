
import React, { useState } from 'react';
import { Book, LoginSession } from '../types';
import FileUpload from './FileUpload';

interface AdminPanelProps {
  onAddBook: (book: Book) => void;
  loginHistory: LoginSession[];
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onAddBook, loginHistory }) => {
  const [formData, setFormData] = useState<Partial<Book>>({
    title: '',
    author: '',
    genre: 'Fiksion Modern',
    published: '',
    pages: 0,
    isbn: '',
    stock: 1,
    synopsis: '',
    coverUrl: '',
    rating: 5,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.coverUrl) return;

    const newBook: Book = {
      ...formData as Book,
      id: Math.random().toString(36).substr(2, 9),
    };

    onAddBook(newBook);
    setFormData({
      title: '',
      author: '',
      genre: 'Fiksion Modern',
      published: '',
      pages: 0,
      isbn: '',
      stock: 1,
      synopsis: '',
      coverUrl: '',
      rating: 5,
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24 animate-in fade-in slide-in-from-bottom duration-700">
      <div className="bg-white/60 backdrop-blur-xl p-10 rounded-3xl border border-primary/10 shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-bold flex items-center gap-3">
            <span className="material-icons text-primary">add_circle_outline</span>
            Shto Libër të Ri
          </h3>
          <span className="text-[9px] uppercase tracking-widest font-bold text-primary/40 italic">Ruajtja është automatike</span>
        </div>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <label className="block">
              <span className="text-[10px] uppercase tracking-widest font-bold text-ink/40 ml-1">Kopertina (Drag & Drop)</span>
              <FileUpload onFileSelect={(url) => setFormData(p => ({ ...p, coverUrl: url }))} />
            </label>
          </div>

          <div className="md:col-span-2 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-ink/40 ml-1">Titulli</label>
                <input 
                  required
                  className="w-full bg-vintage-beige/50 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 italic" 
                  placeholder="p.sh. Pacientja e Heshtur"
                  value={formData.title}
                  onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-ink/40 ml-1">Autori</label>
                <input 
                  required
                  className="w-full bg-vintage-beige/50 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 italic" 
                  placeholder="p.sh. Alex Michaelides"
                  value={formData.author}
                  onChange={e => setFormData(p => ({ ...p, author: e.target.value }))}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-ink/40 ml-1">Zhanri</label>
                <select 
                  className="w-full bg-vintage-beige/50 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 italic appearance-none"
                  value={formData.genre}
                  onChange={e => setFormData(p => ({ ...p, genre: e.target.value }))}
                >
                  <option>Fiksion Modern</option>
                  <option>Klasikë</option>
                  <option>Poezi</option>
                  <option>Filozofi</option>
                  <option>Triller</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest font-bold text-ink/40 ml-1">Gjendja Fillestare</label>
                <input 
                  type="number"
                  min="0"
                  className="w-full bg-vintage-beige/50 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 italic" 
                  value={formData.stock}
                  onChange={e => setFormData(p => ({ ...p, stock: parseInt(e.target.value) }))}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest font-bold text-ink/40 ml-1">Përmbledhja</label>
              <textarea 
                rows={4}
                className="w-full bg-vintage-beige/50 border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 italic resize-none" 
                placeholder="Përshkruani shpirtin e kësaj vepre..."
                value={formData.synopsis}
                onChange={e => setFormData(p => ({ ...p, synopsis: e.target.value }))}
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button 
                type="submit"
                className="px-12 py-4 bg-primary text-white rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
              >
                Shto në Koleksion
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="bg-white/60 backdrop-blur-xl p-10 rounded-3xl border border-primary/10 shadow-xl">
        <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
          <span className="material-icons text-primary">history</span>
          Historiku i Kyçjeve
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-primary/10">
                <th className="py-4 text-[10px] uppercase tracking-widest font-bold text-ink/40">Përdoruesi</th>
                <th className="py-4 text-[10px] uppercase tracking-widest font-bold text-ink/40 text-right">Koha e Kyçjes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {loginHistory.length > 0 ? loginHistory.map(session => (
                <tr key={session.id} className="group hover:bg-primary/5 transition-colors">
                  <td className="py-4 font-semibold text-ink flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    {session.user}
                  </td>
                  <td className="py-4 text-ink/60 text-right italic font-medium">{session.timestamp}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={2} className="py-12 text-center text-ink/40 italic">Asnjë kyçje e regjistruar deri tani.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
