import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchingClasses,
  loadClasses,
  addClass,
  errorOccured as classErrorOccured,
} from '../../datasources/redux/classSlice/slice';
import request from '../../utils/request';
import ClassForm from '../../components/ClassForm/ClassForm';
import ClassCard from '../../components/ClassCard/ClassCard';
//import './ManageClassesPage.css';

const ManageClassesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: classes, loading: classLoading, error: classError } = useSelector((state) => state.classes);

  useEffect(() => {
    const fetchClasses = async () => {
      dispatch(fetchingClasses());
      try {
        const data = await request({ route: '/classes', method: 'GET' });
        dispatch(loadClasses(data));
      } catch (error) {
        dispatch(classErrorOccured(error.message));
      }
    };

    fetchClasses();
  }, [dispatch]);

  const handleAddClass = async (newClass) => {
    try {
      const data = await request({ route: '/classes', method: 'POST', body: newClass });
      dispatch(addClass(data));
    } catch (error) {
      dispatch(classErrorOccured(error.message));
    }
  };

  const handleClassClick = (id) => {
    navigate(`/class/${id}`);
  };

  return (
    <div>
      <h2>Manage Classes</h2>
      <ClassForm onAddClass={handleAddClass} />
      <div className="class-list">
        {classLoading && <p>Loading...</p>}
        {classError && <p>Error: {classError}</p>}
        {classes.map((cls) => (
          <ClassCard
            key={cls._id}
            classData={cls}
            onClick={() => handleClassClick(cls._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ManageClassesPage;
