import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/db.js";
import userRoutes from './routes/user.routes.js';
import classRoutes from './routes/class.routes.js';
import withdrawalRoutes from './routes/withdrawal.routes.js';
import authenticateToken from './middlewares/authMiddleware.js';


const server = express();

dotenv.config();
server.use(express.json());
server.use('/users', userRoutes);

server.use('/classes', classRoutes);
server.use('/withdrawals', withdrawalRoutes);


server.get('/test', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});



server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
  databaseConnection();
});





