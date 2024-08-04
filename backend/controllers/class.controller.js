
import {Class} from '../models/class.model.js'; // Ensure path is correct

// Handler to create a new class
export const createClass = async (req, res) => {
  try {
    const { name, description, files = [] } = req.body; // Default to empty array if files are not provided

    const newClass = new Class({
      name,
      description,
      files,
    });

    await newClass.save();

    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ message: 'Error creating class', error: error.message });
  }
};

// Handler to list all classes
export const getClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching classes', error: error.message });
  }
};

// Handler to enroll a user in a class
export const enrollInClass = async (req, res) => {
  try {
    const { classId } = req.body;
    const userId = req.user.id; // Extract user ID from the authenticated request

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const classToUpdate = await Class.findById(classId);
    if (!classToUpdate) {
      return res.status(404).json({ message: 'Class not found' });
    }

    if (classToUpdate.students.includes(userId)) {
      return res.status(400).json({ message: 'User is already enrolled in this class' });
    }

    classToUpdate.students.push(userId);
    await classToUpdate.save();

    res.json(classToUpdate);
  } catch (error) {
    res.status(400).json({ message: 'Error enrolling in class', error: error.message });
  }
};


export const uploadFileToClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const classToUpdate = await Class.findById(classId);
    if (!classToUpdate) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Add file details to the class
    const fileData = {
      filename: file.filename,
      fileUrl: `/uploads/${file.filename}`
    };

    classToUpdate.files.push(fileData);
    await classToUpdate.save();

    res.status(200).json({ message: 'File uploaded successfully', class: classToUpdate });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
};