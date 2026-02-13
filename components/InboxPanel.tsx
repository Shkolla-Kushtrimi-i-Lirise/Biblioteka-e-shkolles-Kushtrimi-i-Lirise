
import React from 'react';
import { SentEmail } from '../types';

interface InboxPanelProps {
  emails: SentEmail[];
}

const InboxPanel: React.FC<InboxPanelProps> = ({ emails }) => {
  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom duration-700">
      <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-primary/10 shadow-xl">
        <div className="flex items-center gap-3 mb-8">
          <span className="material-icons text-primary">email</span>
          <h3 className="text-xl font-bold">Arkiva e Njoftimeve të Dërguara</h3>
        </div>

        {emails.length > 0 ? (
          <div className="space-y-4">
            {emails.map((email) => (
              <div 
                key={email.id} 
                className="bg-white/80 p-6 rounded-2xl border border-primary/5 hover:border-primary/20 transition-all group"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-primary/60">Për: {email.recipient}</span>
                    <h4 className="text-lg font-bold text-ink mt-1">{email.subject}</h4>
                  </div>
                  <span className="text-xs text-ink/40 italic">{email.timestamp}</span>
                </div>
                <div className="p-4 bg-vintage-beige/30 rounded-xl italic text-ink/70 text-sm leading-relaxed border-l-2 border-primary/20">
                  {email.content}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="material-icons text-xs text-primary/40">bookmark</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-ink/40">Referencë: {email.bookTitle}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <span className="material-icons text-5xl text-ink/10 mb-4">mail_outline</span>
            <p className="text-ink/40 italic">Nuk ka njoftime të dërguara deri tani.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxPanel;
