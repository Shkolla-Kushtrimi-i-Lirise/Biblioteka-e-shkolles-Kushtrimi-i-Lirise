
export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  coverUrl: string;
  synopsis: string;
  published: string;
  pages: number;
  isbn: string;
  stock: number;
  rating: number;
}

export interface LoginSession {
  id: string;
  user: string;
  timestamp: string;
}

export interface SentEmail {
  id: string;
  recipient: string;
  subject: string;
  content: string;
  timestamp: string;
  bookTitle: string;
}

export interface Theme {
  id: string;
  name: string;
  primary: string;
  bg: string;
  secondaryBg: string;
  ink: string;
  accent: string;
}

export type ViewState = 'HOME' | 'ADMIN' | 'LOGIN' | 'INBOX' | 'SETTINGS';
