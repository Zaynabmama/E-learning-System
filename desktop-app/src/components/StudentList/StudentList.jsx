import React from 'react';
import './StudentList.css';

const StudentList = ({ users }) => {
  return (
    <div className="student-list">
      {users.map((user) => (
        <div key={user._id} className="student-item">
          <p>{user.username}</p>
          <p>{user.email}</p>
          <p>Enrolled Classes: {user.enrolledClasses.length}</p>
        </div>
      ))}
    </div>
  );
};

export default StudentList;
