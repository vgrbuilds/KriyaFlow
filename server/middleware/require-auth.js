const { getAuth } = require('@clerk/express');
const requireAuth = (req, res, next) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  req.auth = { userId };
  next();
};

module.exports = { requireAuth };
