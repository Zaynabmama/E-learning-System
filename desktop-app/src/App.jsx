import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage/LoginPage';
import AdminPage from './pages/AdminPage/AdminPage';
import './App.css';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={token ? <AdminPage /> : <Navigate to="/login" />}
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
