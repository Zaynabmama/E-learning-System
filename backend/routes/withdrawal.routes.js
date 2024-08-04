// routes/withdrawal.routes.js
import { Router } from 'express';
import  authenticateToken  from '../middlewares/authMiddleware.js';
import { requestWithdrawal, listWithdrawals, manageWithdrawal } from '../controllers/withdrawal.controller.js';

const router = Router();

// Route to request a withdrawal
 router.post('/request', authenticateToken, requestWithdrawal);
//router.post('/request',  requestWithdrawal);
// Route to list all withdrawal requests (admin)
router.get('/list', authenticateToken, listWithdrawals);

// Route to manage a withdrawal request (admin)
router.post('/manage', authenticateToken, manageWithdrawal);

export default router;
