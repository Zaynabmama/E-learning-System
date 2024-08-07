import React from 'react';
import './ClassCard.css';

const ClassCard = ({ classData, onClick }) => {
  return (
    <div className="class-card" onClick={() => onClick(classData._id)}>
      <h3>{classData.name}</h3>
      <p>{classData.description}</p>
    </div>
  );
};

export default ClassCard;
