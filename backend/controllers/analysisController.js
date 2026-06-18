const Analysis = require('../models/Analysis');
const Expense = require('../models/Expense');

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

const generateAnalysis=async (req,res)=>{
  try{

    const expenses=await Expense.find({user:req.user.id});

    if(expenses.length === 0){
      return res.status(400).json({error:'No expenses to analyze'});
    }

    const prompt = `Analyze these expenses briefly:
${expenses.map(e => `- ${e.title}: ₹${e.amount}`).join('\n')}

Respond in this EXACT format (plain text, no asterisks, no markdown):

Top Spending: [one short line]
Unusual: [one short line, or "None"]
Save On: [one short line]
Tip: [one short actionable sentence]

Keep total under 60 words. Be direct and concise.`;
    const {GoogleGenerativeAI}= require('@google/generative-ai');
    const genAI =new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
   const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});
const result = await model.generateContent(prompt);
    const analysisText =result.response.text();

    const analysis =new Analysis({analysisText,user:req.user.id});
  await analysis.save();


    res.status(201).json({analysisText});
  }catch(error){
    res.status(500).json({error:error.message});
  }

  

};


module.exports = { saveAnalysis, getAnalyses, deleteAnalysis,generateAnalysis };