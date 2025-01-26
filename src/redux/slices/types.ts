export interface Book {
    id: number;
    name: string;
    author: string;
  }
  
  export interface User {
    id: number;
    name: string;
  }
  
  export interface UserDetail {
    id: number;
    name: string;
    currentBooks: Book[];
    pastBooks: Book[];
  }
  
  export interface BookDetail {
    id: number;
    name: string;
    author: string;
    year: number;
    currentOwner: User | null; // Fix: Make currentOwner an object of type User or null
  }
  