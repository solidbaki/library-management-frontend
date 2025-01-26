import React from "react";
import { Routes, Route } from "react-router-dom";
import UserList from "./pages/UserList/UserList";
import UserDetail from "./pages/UserDetail/UserDetail";
import BookList from "./pages/BookList/BookList";
import BookDetail from "./pages/BookDetail/BookDetail";


const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/users/:id" element={<UserDetail />} />
      <Route path="/books" element={<BookList />} />
      <Route path="/books/:id" element={<BookDetail />} />

    </Routes>
  );
};

export default App;
