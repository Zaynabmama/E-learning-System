import React from 'react';
import { useParams } from 'react-router-dom';
import FileUploadForm from '../../components/FileUploadForm'; 
import request from '../../utils/request';
//import './FileUploadPage.css';

const FileUploadPage = () => {
  const { classId } = useParams();

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      await request({ route: `/classes/${classId}/upload`, method: 'POST', body: formData });
     
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="file-upload-container">
      <header>
        <h1>Upload Files</h1>
      </header>
      <section className="content">
        <FileUploadForm onFileUpload={handleFileUpload} />
      </section>
    </div>
  );
};

export default FileUploadPage;
