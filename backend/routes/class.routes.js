import { Router } from 'express';
import { createClass, getClasses, enrollInClass,  uploadFileToClass  } from '../controllers/class.controller.js'; // Ensure path is correct
import  authenticateToken  from '../middlewares/authMiddleware.js';
import upload from '../config/multer.js';
const router = new Router();

// Route to create a new class
router.post('/', createClass);

// Route to list all classes
router.get('/', getClasses);

// Route to enroll a user in a class
//router.post('/enroll', enrollInClass);
router.post('/enroll', authenticateToken, enrollInClass);

router.post('/:classId/upload', authenticateToken, upload.single('file'), uploadFileToClass);

export default router;
