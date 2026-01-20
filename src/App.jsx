import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import NavBar from "./components/NavBar";
import Affirmation from "./pages/Affirmation";
import Home from "./pages/Home";



export default function App() {
  return (
    <Router>
        <NavBar />
      <Routes>
        <Route path="/AuthPage" element={<AuthPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/Affirmation" element={<Affirmation />} />
      </Routes>
    </Router>
  );
}
