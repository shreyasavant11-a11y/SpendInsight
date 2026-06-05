const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);

router.get('/me', protect, async (req, res) => {
  res.json({ message: 'Valid token!', userId: req.user.id });
});

module.exports = router;