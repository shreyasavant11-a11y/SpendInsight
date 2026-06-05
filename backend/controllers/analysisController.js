const Analysis = require('../models/Analysis');

const saveAnalysis = async (req, res) => {
  try {
    const { analysisText } = req.body;
    const analysis = new Analysis({ analysisText, user: req.user.id });
    await analysis.save();
    res.status(201).json(analysis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAnalyses = async (req, res) => {
  try {
    const analyses = await Analysis.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    res.json(analyses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.id);
    if (!analysis) return res.status(404).json({ message: 'Not found' });

    if (analysis.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Analysis.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { saveAnalysis, getAnalyses, deleteAnalysis };