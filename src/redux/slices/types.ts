// Book interface, used for lists and details
export interface Book {
  id: number;
  name: string;
  author?: string; // Optional if not always available
  year?: number;
}

// BookDetail interface, extending Book with more specific details
export interface BookDetail extends Book {
  averageRating?: number;
  currentOwner?: {
    id: number;
    name: string;
  };
}

// UserDetail interface, containing borrowed book details
export interface UserDetail {
  id: number;
  name: string;
  currentBooks: Book[]; // Books currently borrowed
  pastBooks: Book[]; // Books returned in the past
}

// State interfaces for Redux slices
export interface BooksState {
  books: Book[];
  bookDetail: BookDetail | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

export interface UsersState {
  users: { id: number; name: string }[];
  userDetail: UserDetail | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}
