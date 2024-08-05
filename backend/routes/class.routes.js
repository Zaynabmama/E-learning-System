
import { Router } from 'express';
import { createClass, getClasses, enrollInClass, uploadFileToClass } from '../controllers/class.controller.js';
import { authenticateToken, authenticateAdmin } from '../middlewares/authMiddleware.js';
import upload from '../config/multer.js';

const router = Router();

router.post('/', authenticateAdmin, createClass); // Protected route
router.get('/', getClasses);
router.post('/enroll', authenticateToken, enrollInClass);
router.post('/:classId/upload', authenticateAdmin, upload.single('file'), uploadFileToClass);

export default router;
