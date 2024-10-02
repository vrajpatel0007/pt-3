const jwt = require('jsonwebtoken');
const JWT_SECRET = "vraj"
const authUser = async (req, res, next) => {
  try {
    // const token = req.header('Authorization')?.replace('Bearer ', '');
    const token = req.cookies.token;
    console.log("🚀 ~ authUser ~ token:", token)
    console.log("🚀 ~ authUser ~  process.env.JWT_SECRET:", JWT_SECRET)

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("🚀 ~ authUser ~ decoded:", decoded)
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const authorizeAdmin = (req, res, next) => {
  console.log("🚀 ~ authorizeAdmin ~ req.user.Rol:", req.user)
  console.log("🚀 ~ authorizeAdmin ~ req.user && req.user.Rol === 'Admin':", req.user && req.user.Rol === 'Admin')
  if (req.user && req.user.Rol === 'Admin') {
    next();
  } else {
    res.status(403).json({ message: 'Unauthorized. Admin access required' });
  }
};



module.exports = {
  authUser,
  authorizeAdmin
};
