import { useState } from 'react';
import Layout from '../components/Layout';
import API from '../api/axios';

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

      <button
        onClick={handleGenerate}
        disabled={generating}
        className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-lg px-6 py-3 mb-6"
      >
        {generating ? 'Analyzing...' : '🤖 Analyze My Expenses'}
      </button>

      <button
        onClick={togglePast}
        className="bg-gray-600 hover:bg-gray-700 text-white rounded-lg px-6 py-3 mb-6 ml-4"
      >
        {showPast ? 'Hide Past Analyses' : 'View Past Analyses'}
      </button>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      {currentAnalysis && (
        <div className="bg-gray-700 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold mb-3">Latest Analysis</h2>
          <p className="text-gray-300 whitespace-pre-line">{currentAnalysis}</p>
        </div>
      )}

      {showPast && (
        <>
          <h2 className="text-xl font-bold mb-4">Past Analyses</h2>
          <div className="space-y-4">
            {analyses.length === 0 ? (
              <p className="text-gray-400">No past analyses yet!</p>
            ) : (
              analyses.map((item) => (
                <div key={item._id} className="bg-gray-700 rounded-xl p-6">
                  <p className="text-gray-400 text-sm mb-2">
                    {new Date(item.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </p>
                  <p className="text-gray-300 whitespace-pre-line">{item.analysisText}</p>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </Layout>
  );
};

export default AnalysisHistory;