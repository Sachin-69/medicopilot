import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post('http://localhost:8000/analyze-text', {
        text: inputText
      });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError('Connection error or invalid response. Check backend logs.');
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskClass = (level) => {
    const l = level?.toLowerCase();
    if (l === 'high') return 'risk-high';
    if (l === 'medium') return 'risk-medium';
    return 'risk-low';
  };

  return (
    <div className="app-wrapper">
      <section className="hero-section">
        <h1>Intelligence for healthcare.</h1>
        <p>Uncover deep insights, summaries, and risk assessments instantly from medical text.</p>
      </section>

      <main className="main-content">
        <div className="input-card">
          <form onSubmit={handleSubmit}>
            <h2>Medical context</h2>
            <textarea
              className="super-textarea"
              placeholder="Paste patient symptoms, history, or notes here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="btn-primary" 
              disabled={isLoading || !inputText.trim()}
            >
              {isLoading ? (
                <><span className="spinner"></span> Analyzing...</>
              ) : (
                'Run analysis'
              )}
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>

        {result && (
          <div className="results-card">
            <div className="results-header">
              <h2>Analysis</h2>
              <span className={`risk-badge ${getRiskClass(result.risk_level)}`}>
                {result.risk_level} Risk
              </span>
            </div>
            
            <div className="summary-section">
              <div className="section-label">Summary</div>
              <p className="summary-text">{result.summary}</p>
            </div>

            <div className="summary-section">
              <div className="section-label">Key Insights</div>
              <ul className="insights-list">
                {result.insights && result.insights.map((insight, index) => (
                  <li key={index}>{insight}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
