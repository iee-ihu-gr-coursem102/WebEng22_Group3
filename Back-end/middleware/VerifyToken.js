import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  console.log('verify headers', req.headers);
  const token = req.headers['x-token'];
  //   const token = authHeader && authHeader.split(' ')[1];
  console.log('TOKEN: ', token);
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    console.log('Decoded ', decoded);
    console.log('Decoded email: ', decoded.email);
    req.email = decoded.email;
    req.roles = decoded.roles;
    next();
  });
};
