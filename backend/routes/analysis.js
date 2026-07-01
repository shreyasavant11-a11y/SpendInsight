const express = require('express');
const router = express.Router();
const { saveAnalysis, getAnalyses, deleteAnalysis, generateAnalysis } = require('../controllers/analysisController');
const protect = require('../middleware/authMiddleware');
const rateLimit = require('express-rate-limit');

const analysisLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 10, 
  message: { error: 'Analysis limit reached, please try again later' },
});

router.post('/', protect, saveAnalysis);
router.get('/', protect, getAnalyses);
router.delete('/:id', protect, deleteAnalysis);
router.post('/generate', protect, analysisLimiter, generateAnalysis);

module.exports = router;