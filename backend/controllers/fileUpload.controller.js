import multer from 'multer';
import path from 'path';
import { Class } from '../models/class.model.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); 
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type'), false);
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024 
  }
}).single('file');

export const uploadFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const { classId } = req.body; 

    try {

      const classToUpdate = await Class.findById(classId);
      if (!classToUpdate) {
        return res.status(404).json({ message: 'Class not found' });
      }

      const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

      classToUpdate.files.push({ filename: req.file.originalname, fileUrl });
      await classToUpdate.save();

      res.status(200).json({ success: 'File upload successful', file: req.file });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
