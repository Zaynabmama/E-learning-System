import React, { useState } from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const ClassForm = ({ onAddClass }) => {
  const [newClassName, setNewClassName] = useState('');
  const [newClassDescription, setNewClassDescription] = useState('');

  const handleAddClass = () => {
    const newClass = {
      name: newClassName,
      description: newClassDescription,
      files: [],
    };
    onAddClass(newClass);
    setNewClassName('');
    setNewClassDescription('');
  };

  return (
    <div className="add-class-form">
      <Input
        type="text"
        placeholder="Class Name"
        value={newClassName}
        onChange={(e) => setNewClassName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Class Description"
        value={newClassDescription}
        onChange={(e) => setNewClassDescription(e.target.value)}
      />
      <Button onClick={handleAddClass} text="Add Class" />
    </div>
  );
};

export default ClassForm;
