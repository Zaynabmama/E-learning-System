import { Router } from 'express';
import { registerUser, loginUser, getUsers,deleteUser } from '../controllers/user.controller.js'; 

const router = new Router();


router.post('/register', registerUser);


router.post('/login', loginUser);
router.get('/', getUsers);
router.delete('/:userId', deleteUser);

export default router;
