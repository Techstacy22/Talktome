import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import NavBar from "./components/NavBar";



export default function App() {
  return (
    <Router>
        <NavBar />
      <Routes>
        <Route path="/*" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}
