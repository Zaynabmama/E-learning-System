import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import request, { GET, DELETE } from '../../utils/request';
import { fetchingUsers, loadUsers, errorOccured, removeUser } from '../../datasources/redux/userSlice/slice';
import Button from '../../components/Button/Button';
import './ListStudentsPage.css';

const ListStudentsPage = () => {
  const dispatch = useDispatch();
  const { list: users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(fetchingUsers());
      try {
        const response = await request({ route: '/users', method: GET });
        dispatch(loadUsers(response));
      } catch (err) {
        dispatch(errorOccured(err.message));
      }
    };

    fetchUsers();
  }, [dispatch]);

  const handleDelete = async (userId) => {
    try {
      await request({ route: `/users/${userId}`, method: DELETE });
      dispatch(removeUser(userId));
    } catch (err) {
      console.error("Error deleting user:", err);
      dispatch(errorOccured(err.message));
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="students-container">
      <h2>List Students</h2>
      <table className="students-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Enrolled Classes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.enrolledClasses.map(cls => cls.name).join(', ') || 'No enrolled classes'}</td>
              <td>
                <Button text="Delete" onClick={() => handleDelete(user._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListStudentsPage;
