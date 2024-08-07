import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchingClassDetails, loadClassDetails, errorOccured, fileUploadSuccess } from '../../datasources/redux/classSlice/slice';
import request from '../../utils/request';
import FileUploadForm from '../../components/FileUploadForm';
import './ClassDetailsPage.css';

const ClassDetailsPage = () => {
  const { classId } = useParams();
  const dispatch = useDispatch();
  const { classDetails, loading, error } = useSelector((state) => state.classes);

  useEffect(() => {
    const fetchClassDetails = async () => {
      dispatch(fetchingClassDetails());
      try {
        const data = await request({ route: `/classes/${classId}`, method: 'GET' });
        dispatch(loadClassDetails(data));
      } catch (error) {
        dispatch(errorOccured(error.message));
      }
    };

    fetchClassDetails();
  }, [classId, dispatch]);

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await request({
        route: `/classes/${classId}/upload`,
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      dispatch(fileUploadSuccess(response));
    } catch (error) {
      dispatch(errorOccured(error.message));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="class-details-container">
      <header>
        <h1>Class Details</h1>
      </header>
      <section className="content">
        {classDetails ? (
          <>
            <h2>{classDetails.name}</h2>
            <p>{classDetails.description}</p>

            <div className="enrolled-students">
              <h3>Enrolled Students</h3>
              {classDetails.students && classDetails.students.length > 0 ? (
                <ul>
                  {classDetails.students.map(student => (
                    <li key={student._id}>{student.username}</li>
                  ))}
                </ul>
              ) : (
                <p>No students enrolled.</p>
              )}
            </div>

            <div className="uploaded-files">
              <h3>Uploaded Files</h3>
              {classDetails.files && classDetails.files.length > 0 ? (
                <ul>
                  {classDetails.files.map((file, index) => (
                    <li key={index}>
                      <a href={`http://localhost:5000/uploads/${file.filename}`} target="_blank" rel="noopener noreferrer">
                        {file.filename}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No files uploaded.</p>
              )}
            </div>

            <div className="file-upload">
              <h3>Upload Files</h3>
              <FileUploadForm onFileUpload={handleFileUpload} />
            </div>
          </>
        ) : (
          <p>No class details available</p>
        )}
      </section>
    </div>
  );
};

export default ClassDetailsPage;
