

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import databaseConnection from './config/db.js';
import userRoutes from './routes/user.routes.js';
import classRoutes from './routes/class.routes.js';
import withdrawalRoutes from './routes/withdrawal.routes.js';
import { authenticateToken, authenticateAdmin } from './middlewares/authMiddleware.js';



const server = express();

dotenv.config();
server.use(cors()); 
server.use(express.json());
server.use('/users', userRoutes);

server.use('/classes', classRoutes);
server.use('/withdrawals', withdrawalRoutes);

 const __filename = fileURLToPath(import.meta.url);
 const __dirname = dirname(__filename);
 server.use('/uploads', express.static(join(__dirname, 'uploads'))); 
server.get('/test', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});
server.get('/testa', authenticateAdmin, (req, res) => {
  res.json({ user: req.user });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await databaseConnection();
});

