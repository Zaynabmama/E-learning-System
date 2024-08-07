import React, { useState } from 'react';
import Button from '../Button/Button';

const FileUploadForm = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="file-upload-form">
      <input type="file" onChange={handleFileChange} />
      <Button type="submit" text="Upload" />
    </form>
  );
};

export default FileUploadForm;
