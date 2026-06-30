const Analysis = require('../models/Analysis');
const Expense = require('../models/Expense');
const mongoose = require('mongoose');

const saveAnalysis = async (req, res) => {
  try {
    const { analysisText } = req.body;
    const analysis = new Analysis({ analysisText, user: req.user.id });
    await analysis.save();
    res.status(201).json(analysis);
  } catch (error) {
    console.error('Save analysis error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getAnalyses = async (req, res) => {
  try {
    const analyses = await Analysis.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    res.json(analyses);
  } catch (error) {
    console.error('Get analysis error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const deleteAnalysis = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const analysis = await Analysis.findById(req.params.id);
    if (!analysis) return res.status(404).json({ message: 'Not found' });

    if (analysis.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Analysis.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    console.error('Delete analysis error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const generateAnalysis = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });

    if (expenses.length === 0) {
      return res.status(400).json({ error: 'No expenses to analyze' });
    }

    const prompt = `You are a personal finance advisor analyzing a user's expenses. Here is their expense data:

      ${expenses.map(e => `- ${e.title}: ₹${e.amount} (${e.note || 'no note'}) on ${new Date(e.date).toLocaleDateString()}`).join('\n')}

      Provide a thoughtful analysis covering:
      1. Which spending categories dominate, and what that suggests about their lifestyle/priorities
      2. Any expense that looks unusual, risky, or worth questioning (with specific reasoning, not just "it's big")
      3. A specific, realistic saving opportunity based on the actual data (mention real numbers)
      4. One actionable recommendation tailored to THIS data, not generic advice

    Write in plain conversational text, no markdown, no asterisks, no rigid headers. Make it feel like a knowledgeable friend reviewing their spending — specific, insightful, slightly different each time based on what's actually unusual in the data. Around 80-120 words.

    FORMAT RULES (important):
    - Start with ONE short conversational opening line (no heading).
    - Then present the 4 points as SHORT separate lines or bullet points, each 1-2 sentences max, with a bolded 2-4 word label at the start of each point (e.g. "Biggest spend —", "Worth a second look —", "Save here —", "Try this —"). Vary these labels naturally each time, don't reuse the same exact words always.
    - Use line breaks between each point so it's scannable, not one dense paragraph.
    - No markdown headers, especially no asterisks around whole sentences, just plain text with line breaks.
    - Total length: 80-120 words.`;

    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });
    const result = await model.generateContent(prompt);
    const analysisText = result.response.text();

    const analysis = new Analysis({ analysisText, user: req.user.id });
    await analysis.save();

    res.status(201).json({ analysisText });
  } catch (error) {
    console.error('Generate analysis error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { saveAnalysis, getAnalyses, deleteAnalysis, generateAnalysis };