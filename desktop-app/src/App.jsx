// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import LoginPage from './pages/LoginPage/LoginPage';
import AdminPage from './pages/AdminPage/AdminPage';
import ClassDetailsPage from './pages/ClassDetailsPage/ClassDetailsPage';
import ManageClassesPage from './pages/ManageClassesPage/ManageClassesPage';
import ListStudentsPage from './pages/ListStudentsPage/ListStudentsPage';
import UploadFilesPage from './pages/UploadFilesPage/UploadFilesPage';
import ManageWithdrawalsPage from './pages/ManageWithdrawalsPage/ManageWithdrawalsPage';
import store from './datasources/redux/store';
import './App.css';

function App() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin/*"
              element={token && role === 'admin' ? <AdminPage /> : <Navigate to="/login" />}
            >
              <Route path="classes" element={<ManageClassesPage />} />
              <Route path="students" element={<ListStudentsPage />} />
              <Route path="uploads" element={<UploadFilesPage />} />
              <Route path="withdrawals" element={<ManageWithdrawalsPage />} />
              <Route path="" element={<Navigate to="classes" />} /> {/* Default redirect */}
            </Route>
            <Route path="/class/:classId" element={<ClassDetailsPage />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
