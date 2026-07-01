const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 
  max: 10, 
  message: { error: 'Too many attempts, please try again after 15 minutes' },
});

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);

router.get('/me', protect, async (req, res) => {
  res.json({ message: 'Valid token!', userId: req.user.id });
});

module.exports = router;