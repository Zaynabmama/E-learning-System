import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  console.log('Authenticating token...');
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Token verification failed:', err);
      return res.sendStatus(403);
    }
    req.user = user;
    console.log('Token authenticated successfully:', req.user);
    next();
  });
};

export const authenticateAdmin = (req, res, next) => {
  console.log('Authenticating admin...');
  authenticateToken(req, res, () => {
    if (req.user && req.user.role === 'admin') {
      console.log('Admin role confirmed.');
      next();
    } else {
      console.error('Forbidden: User is not an admin.');
      res.sendStatus(403);
    }
  });
};
