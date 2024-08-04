import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/user.controller.js'; // Ensure path is correct

const router = new Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to log in a user
router.post('/login', loginUser);

export default router;
