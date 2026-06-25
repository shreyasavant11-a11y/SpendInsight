import { useState } from 'react';
import Layout from '../components/Layout';
import API from '../api/axios';
import { Sparkles, TrendingUp, PiggyBank, Bell, Lightbulb, FileText, ChevronDown, Info, Bot } from 'lucide-react';

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
          View Past Analyses
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

     
      <h2 className="text-lg font-bold mb-3">Latest Analysis</h2>
      <div className="bg-[#1c1f2e] border border-white/5 rounded-2xl p-10 mb-8">
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

      
      <div className="bg-[#1c1f2e] border border-white/5 rounded-2xl overflow-hidden">
        <button
          onClick={togglePast}
          className="w-full flex items-center justify-between p-5 text-left"
        >
          <span className="font-semibold">Past Analyses</span>
          <ChevronDown
            size={18}
            className={`text-gray-400 transition-transform ${showPast ? 'rotate-180' : ''}`}
          />
        </button>

        {showPast && (
          <div className="px-5 pb-5 space-y-3">
            {analyses.length === 0 ? (
              <div className="flex items-center gap-2 bg-[#0f1117] border border-white/5 rounded-lg p-4 text-gray-400 text-sm">
                <Info size={16} />
                No past analyses found.
              </div>
            ) : (
              analyses.map((item) => (
                <div key={item._id} className="bg-[#0f1117] border border-white/5 rounded-lg p-4">
                  <p className="text-gray-500 text-xs mb-2">
                    {new Date(item.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </p>
                  <p className="text-gray-300 text-sm whitespace-pre-line">{item.analysisText}</p>
                </div>
              ))
            )}
          </div>
        )}

        {!showPast && (
          <div className="px-5 pb-5">
            <div className="flex items-center gap-2 bg-[#0f1117] border border-white/5 rounded-lg p-4 text-gray-400 text-sm">
              <Info size={16} />
              Click "View Past Analyses" to see your previous analysis reports.
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-gray-500 text-xs mt-6">
        AI insights are generated using Gemini API ✨
      </p>
    </Layout>
  );
};

export default AnalysisHistory;