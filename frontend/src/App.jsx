import React, { useState } from 'react';
import SymptomForm from './components/SymptomForm';
import ReportUpload from './components/ReportUpload';
import ResultCards from './components/ResultCards';
import './index.css';

function App() {
  const [results, setResults] = useState(null);

  return (
    <div className="container">
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--accent-color)', fontSize: '2.5rem', marginBottom: '8px' }}>MediCopilot</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', margin: 0 }}>AI-powered healthcare & insurance assistant</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '24px', marginBottom: '40px' }}>
        <SymptomForm setResults={setResults} />
        <ReportUpload setResults={setResults} />
      </div>

      <ResultCards results={results} />

      <div style={{ marginTop: '40px', padding: '20px', textAlign: 'center', color: '#aaa', fontSize: '0.85rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        This system provides AI-assisted insights and is not a substitute for professional medical or financial advice.
      </div>
    </div>
  );
}

export default App;
