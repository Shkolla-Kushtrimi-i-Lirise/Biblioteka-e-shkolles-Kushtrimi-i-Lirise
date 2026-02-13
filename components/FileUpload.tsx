
import React, { useState } from 'react';

interface FileUploadProps {
  onFileSelect: (base64: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
    else if (e.type === 'dragleave') setIsDragging(false);
  };

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        onFileSelect(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div 
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative aspect-[2/3] border-2 border-dashed rounded-xl transition-all flex flex-col items-center justify-center gap-4 overflow-hidden group ${
          isDragging ? 'border-primary bg-primary/5 scale-105' : 'border-primary/20 bg-vintage-beige/50'
        }`}
      >
        {preview ? (
          <>
            <img src={preview} className="absolute inset-0 w-full h-full object-cover" alt="Preview" />
            <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
              <span className="text-white text-xs font-bold uppercase tracking-widest">Ndrysho Kopertinën</span>
            </div>
          </>
        ) : (
          <>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-icons text-primary">cloud_upload</span>
            </div>
            <div className="text-center px-4">
              <p className="text-sm font-bold text-ink">Tërhiq Kopertinën</p>
              <p className="text-[10px] text-ink/40 uppercase tracking-widest mt-1">ose kliko për të zgjedhur</p>
            </div>
          </>
        )}
        <input 
          type="file" 
          className="absolute inset-0 opacity-0 cursor-pointer" 
          onChange={handleInput} 
          accept="image/*"
        />
      </div>
    </div>
  );
};

export default FileUpload;
