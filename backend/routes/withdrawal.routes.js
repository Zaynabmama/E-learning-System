
import { Router } from 'express';
import  {authenticateToken}  from '../middlewares/authMiddleware.js';
import { requestWithdrawal, listWithdrawals, manageWithdrawal } from '../controllers/withdrawal.controller.js';

const router = Router();

 router.post('/request', authenticateToken, requestWithdrawal);
//router.post('/request',  requestWithdrawal);

router.get('/list', authenticateToken, listWithdrawals);


router.post('/manage', authenticateToken, manageWithdrawal);

export default router;
