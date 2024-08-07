import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import request, { GET, PUT } from '../../utils/request';
import { fetchingWithdrawals, loadWithdrawals, errorOccured, updateWithdrawalStatus } from '../../datasources/redux/withdrawalSlice/slice';
import Button from '../../components/Button/Button';
//import './ManageWithdrawalsPage.css';

const ManageWithdrawalsPage = () => {
  const dispatch = useDispatch();
  const { list: withdrawals, loading, error } = useSelector((state) => state.withdrawals);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      dispatch(fetchingWithdrawals());
      try {
        const response = await request({ route: '/withdrawals/list', method: GET });
        dispatch(loadWithdrawals(response));
      } catch (err) {
        dispatch(errorOccured(err.message));
      }
    };

    fetchWithdrawals();
  }, [dispatch]);

  const handleUpdateStatus = async (withdrawalId, status) => {
    try {
      const route = `/withdrawals/manage`;
      await request({ route, method: PUT, body: { id: withdrawalId, status } });
      dispatch(updateWithdrawalStatus({ withdrawalId, status }));
    } catch (err) {
      console.error(`Error ${status === 'approved' ? 'approving' : 'rejecting'} withdrawal:`, err);
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
    <div className="withdrawals-container">
      <h2>Manage Withdrawals</h2>
      <table className="withdrawals-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Class</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {withdrawals.map((withdrawal) => (
            <tr key={withdrawal._id}>
              <td>{withdrawal.user ? withdrawal.user.username : 'Unknown User'}</td>
              <td>{withdrawal.class ? withdrawal.class.name : 'Unknown Class'}</td>
              <td>{withdrawal.status}</td>
              <td>
                <Button text="Approve" onClick={() => handleUpdateStatus(withdrawal._id, 'approved')} />
                <Button text="Reject" onClick={() => handleUpdateStatus(withdrawal._id, 'rejected')} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageWithdrawalsPage;
