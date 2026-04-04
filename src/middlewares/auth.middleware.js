const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  const tokenFromHeader = bearerToken && bearerToken.startsWith('Bearer ')
    ? bearerToken.split(' ')[1]
    : null;
  const token = req.cookies.token || tokenFromHeader;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;