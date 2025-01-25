import React from "react";
import { Routes, Route } from "react-router-dom";
import UserList from "./pages/UserList/UserList";
import UserDetail from "./pages/UserDetail/UserDetail";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/users/:id" element={<UserDetail />} />
    </Routes>
  );
};

export default App;
