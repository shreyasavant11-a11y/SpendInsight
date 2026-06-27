import { useState } from 'react';
import Layout from '../components/Layout';
import API from '../api/axios';
import { Sparkles, TrendingUp, PiggyBank, Bell, Lightbulb, FileText, ChevronDown, Info, Bot,Trash2 } from 'lucide-react';

const AnalysisHistory = () => {
  const [analyses, setAnalyses] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState('');
  const [error, setError] = useState('');
  const [showPast, setShowPast] = useState(false);

  const fetchAnalyses = async () => {
    try {
      const response = await API.get('/analysis');
      setAnalyses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setError('');
    try {
      const response = await API.post('/analysis/generate');
      setCurrentAnalysis(response.data.analysisText);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setGenerating(false);
    }
  };

  const handleDelete = async(id) =>{
    try{
      await API.delete(`/analysis/${id}`);
     setAnalyses(analyses.filter(a => a._id !== id));
    }catch(error){
      console.error(error);
    }
    };
  

  const togglePast = () => {
    if (!showPast) fetchAnalyses();
    setShowPast(!showPast);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">AI Analysis</h1>

      <div className="flex gap-3 mb-6">
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-lg px-5 py-2.5 font-medium transition"
        >
          <Sparkles size={18} />
          {generating ? 'Analyzing...' : 'Analyze My Expenses'}
        </button>

        <button
          onClick={togglePast}
          className="flex items-center gap-2 bg-transparent border border-white/15 hover:bg-white/5 text-white rounded-lg px-5 py-2.5 font-medium transition"
        >
          <FileText size={18} />
          {showPast ? 'Hide Past Analyses' : 'View Past Analyses'}
        </button>
      </div>

      <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/20 border border-purple-500/20 rounded-2xl p-6 mb-8">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="bg-purple-600/20 rounded-xl p-3">
              <Bot className="text-purple-400" size={32} />
            </div>
            <div>
              <h2 className="text-purple-300 font-semibold text-lg mb-1">Smart Expense Insights</h2>
              <p className="text-gray-400 text-sm">
                Generate personalized insights from your spending patterns.
              </p>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-300 shrink-0">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-purple-400" />
              Spending trends
            </div>
            <div className="flex items-center gap-2">
              <PiggyBank size={16} className="text-purple-400" />
              Saving opportunities
            </div>
            <div className="flex items-center gap-2">
              <Bell size={16} className="text-purple-400" />
              Expense alerts
            </div>
            <div className="flex items-center gap-2">
              <Lightbulb size={16} className="text-purple-400" />
              Recommendations
            </div>
          </div>
        </div>
      </div>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      {!showPast && (
        <>
          <h2 className="text-lg font-bold mb-3">Latest Analysis</h2>
          <div className="bg-[#1c1f2e] border border-white/5 rounded-2xl p-10">
            {currentAnalysis ? (
              <p className="text-gray-300 whitespace-pre-line">{currentAnalysis}</p>
            ) : (
              <div className="flex flex-col items-center justify-center text-center">
                <FileText className="text-gray-600 mb-4" size={40} />
                <p className="text-white font-medium mb-1">No analysis yet</p>
                <p className="text-gray-500 text-sm">
                  Click "Analyze My Expenses" to get AI-powered insights.
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {showPast && (
        <>
          <h2 className="text-lg font-bold mb-3">Past Analyses</h2>
          <div className="space-y-3">
            {analyses.length === 0 ? (
              <div className="flex items-center gap-2 bg-[#1c1f2e] border border-white/5 rounded-lg p-4 text-gray-400 text-sm">
                <Info size={16} />
                No past analyses found.
              </div>
            ) : (
              analyses.map((item) => (
                <div key={item._id} className="bg-[#1c1f2e] border border-white/5 rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-gray-500 text-xs">
                      {new Date(item.createdAt).toLocaleString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-gray-500 hover:text-red-400 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-gray-300 text-sm whitespace-pre-line">{item.analysisText}</p>
                </div>
              ))
            )}
          </div>
        </>
      )}

      <p className="text-center text-gray-500 text-xs mt-6">
        AI insights are generated using Gemini API ✨
      </p>
    </Layout>
  );
};

export default AnalysisHistory;