
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import './AdminPage.css';

const AdminPage = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="main-content">
        <header>
          <h1>Admin Dashboard</h1>
        </header>
        <Outlet /> 
      </div>
    </div>
  );
};

export default AdminPage;


