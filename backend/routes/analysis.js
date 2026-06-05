const express = require('express');
const router = express.Router();
const { saveAnalysis, getAnalyses, deleteAnalysis } = require('../controllers/analysisController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, saveAnalysis);
router.get('/', protect, getAnalyses);
router.delete('/:id', protect, deleteAnalysis);

module.exports = router;