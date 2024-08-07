
import {Class} from '../models/class.model.js';
import {User} from '../models/user.model.js';


export const createClass = async (req, res) => {
  try {
    const { name, description, files = [] } = req.body; 

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

export const getClassById = async (req, res) => {
  try {
    const { classId } = req.params;
    const classDetails = await Class.findById(classId).populate('students', 'username');

    if (!classDetails) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.json(classDetails);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching class details', error: error.message });
  }
};



export const getClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching classes', error: error.message });
  }
};


export const enrollInClass = async (req, res) => {
  try {
    const { classId } = req.body;
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const classToUpdate = await Class.findById(classId);
    if (!classToUpdate) {
      return res.status(404).json({ message: 'Class not found' });
    }

    const userToUpdate = await User.findById(userId);
    if (!userToUpdate) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (classToUpdate.students.includes(userId)) {
      return res.status(400).json({ message: 'User is already enrolled in this class' });
    }

    classToUpdate.students.push(userId);
    await classToUpdate.save();

  
    userToUpdate.enrolledClasses.push(classId);
    await userToUpdate.save();

    res.json({ class: classToUpdate, user: userToUpdate });
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