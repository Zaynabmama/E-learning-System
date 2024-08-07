
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="/admin/classes">Manage Classes</Link></li>
          <li><Link to="/admin/students">List Students</Link></li>
          <li><Link to="/admin/uploads">Upload Files</Link></li>
          <li><Link to="/admin/withdrawals">Manage Withdrawals</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
