
import React from 'react';
import { Book } from '../types';

interface BookDetailsProps {
  book: Book;
  isBorrowed: boolean;
  isAdmin: boolean;
  onClose: () => void;
  onBorrow: () => void;
  onRemove: () => void;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book, isBorrowed, isAdmin, onClose, onBorrow, onRemove }) => {
  return (
    <aside className="fixed top-4 right-4 bottom-4 w-full max-w-[480px] bg-white shadow-2xl z-[60] rounded-2xl overflow-hidden border border-primary/10 flex flex-col animate-in slide-in-from-right duration-500">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-primary hover:text-white transition-all z-30 shadow-lg"
      >
        <span className="material-icons text-base">close</span>
      </button>

      {isAdmin && (
        <button 
          onClick={() => {
            if(window.confirm('A jeni të sigurt që dëshironi të fshini këtë libër?')) {
              onRemove();
            }
          }}
          className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-500 hover:text-white transition-all z-30 shadow-lg text-red-500"
          title="Fshi Librin"
        >
          <span className="material-icons text-base">delete</span>
        </button>
      )}

      <div className="h-80 relative shrink-0 overflow-hidden">
        <img 
          alt="Blur Backdrop" 
          className="w-full h-full object-cover blur-2xl scale-125 opacity-30" 
          src={book.coverUrl} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center pt-12">
          <img 
            alt={book.title} 
            className="w-40 aspect-[2/3] object-cover rounded shadow-2xl ring-8 ring-white/50 border border-primary/5" 
            src={book.coverUrl} 
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-10 pb-10 pt-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2 leading-tight">{book.title}</h2>
          <p className="text-xl text-primary italic mb-4">{book.author}</p>
          <div className="flex items-center justify-center gap-3">
            <span className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-bold rounded-full uppercase tracking-[0.2em]">{book.genre}</span>
            <span className="px-3 py-1 bg-ink/5 text-ink/60 text-[10px] font-bold rounded-full uppercase tracking-[0.2em]">Gjendja: {book.stock}</span>
          </div>
        </div>

        <div className="space-y-8">
          <section>
            <div className="flex items-center justify-between mb-4 border-b border-primary/10 pb-1">
              <h5 className="text-[10px] uppercase tracking-[0.3em] font-bold text-ink/40">Përmbledhja</h5>
            </div>
            <p className="text-ink/80 leading-relaxed text-lg italic">
              {book.synopsis}
            </p>
          </section>

          <div className="grid grid-cols-2 gap-px bg-primary/10 rounded-xl overflow-hidden border border-primary/10">
            {[
              { label: 'Botuar', value: book.published },
              { label: 'Faqe', value: `${book.pages} faqe` },
              { label: 'ISBN', value: book.isbn },
              { label: 'Vlerësimi', value: Array(5).fill(0).map((_, i) => (
                <span key={i} className="material-icons text-xs text-primary">
                  {i < Math.floor(book.rating) ? 'star' : (i < book.rating ? 'star_half' : 'star_border')}
                </span>
              ))}
            ].map((stat, idx) => (
              <div key={idx} className="bg-white p-5">
                <p className="text-[9px] text-ink/40 uppercase tracking-widest font-bold mb-1">{stat.label}</p>
                <div className="font-semibold italic text-sm text-ink">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-8 border-t border-primary/10 bg-white/95 backdrop-blur-md flex gap-4">
        <button 
          disabled={!isBorrowed && book.stock === 0}
          onClick={onBorrow}
          className={`flex-1 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-xl ${isBorrowed ? 'bg-ink text-white hover:bg-ink/90' : (book.stock > 0 ? 'bg-primary text-white hover:brightness-110 shadow-primary/20' : 'bg-ink/10 text-ink/40 cursor-not-allowed')}`}
        >
          <span className="material-icons text-sm">{isBorrowed ? 'keyboard_return' : (book.stock > 0 ? 'auto_stories' : 'block')}</span>
          {isBorrowed ? 'Kthe Librin' : (book.stock > 0 ? 'Huazo Librin' : 'Nuk ka në gjendje')}
        </button>
        <button className="px-6 py-4 rounded-xl border border-primary/30 text-primary hover:bg-primary/5 transition-colors">
          <span className="material-icons text-sm">favorite_border</span>
        </button>
      </div>
    </aside>
  );
};

export default BookDetails;
