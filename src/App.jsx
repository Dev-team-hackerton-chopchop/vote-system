import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './components/pages/LandingPage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import ForgetPasswordPage from './components/pages/ForgetPasswordPage';
import HomePage from './components/pages/HomePage';
import CreateVote from './components/pages/CreateVote';
import Middlepage from './components/pages/Middlepage';
import ViewandVoting from './components/pages/ViewandVoting';

import './App.css';


export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/create" element={<CreateVote />} />
          <Route path="/Middle" element={<Middlepage />} />
          <Route path="/View" element={<ViewandVoting />} />
        </Routes>
      </div>
    </Router>
  );
}
