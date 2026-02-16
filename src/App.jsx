import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Affirmation from "./pages/Affirmation";
import Talkspace from "./pages/Talkspace";
import Journal from "./pages/Journal";
import Dashboard from "./pages/Dashboard";
import Therapists from "./pages/Therapists";
import AuthPage from "./components/AuthPage";

export default function App() {
  return (
    
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/talkspace" element={<Talkspace />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/therapists" element={<Therapists />} />
        <Route path="/affirmation" element={<Affirmation />} />
        <Route path="/authpage" element={<AuthPage />} />
      </Routes>
    </AuthProvider>
  );
}
