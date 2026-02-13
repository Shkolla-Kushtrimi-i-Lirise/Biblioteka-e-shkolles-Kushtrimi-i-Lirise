
import React from 'react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  isSelected: boolean;
  isBorrowed: boolean;
  onClick: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, isSelected, isBorrowed, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer flex flex-col items-center sm:items-start"
    >
      <div className={`relative mb-6 transition-all duration-500 w-full max-w-[240px] ${isSelected ? 'ring-offset-8 ring-offset-vintage-beige/50 ring-4 ring-primary rounded-lg scale-95' : 'hover:-translate-y-2'}`}>
        <img 
          alt={book.title} 
          className="w-full aspect-[2/3] object-cover rounded-lg shadow-[15px_15px_30px_rgba(0,0,0,0.08)] grayscale-[0.2] group-hover:grayscale-0 transition-all border border-primary/5" 
          src={book.coverUrl} 
        />
        {book.stock === 0 && !isBorrowed && (
          <div className="absolute inset-0 bg-ink/60 rounded-lg flex items-center justify-center backdrop-blur-[2px]">
            <span className="text-white text-xs font-bold uppercase tracking-[0.3em]">Jashtë gjendjes</span>
          </div>
        )}
        {isBorrowed && (
          <div className="absolute top-4 right-4 bg-primary text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg animate-pulse">
            E Huazuar
          </div>
        )}
      </div>
      <div className="text-center sm:text-left w-full">
        <h4 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors leading-tight">{book.title}</h4>
        <p className="text-primary italic font-medium">{book.author}</p>
        <p className="text-[10px] uppercase tracking-widest text-ink/40 font-bold mt-2">{book.genre}</p>
      </div>
    </div>
  );
};

export default BookCard;
