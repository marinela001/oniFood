const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyJWT = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); // Unauthorized
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, decoded: any) => {
    if (err) return res.status(403).json({ message: 'invalid token' }); //invalid token
    req.user = decoded.UserInfo.username;
    // req.roles = decoded.UserInfo.roles;
    next();
  });
};
module.exports = verifyJWT;