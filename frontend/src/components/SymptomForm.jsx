import React, { useState } from 'react';

function SymptomForm({ setResults }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('http://localhost:8000/analyze-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <h2>Symptom Analysis</h2>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="symptoms">Describe symptoms</label>
          <textarea 
            id="symptoms"
            rows="5" 
            placeholder="e.g., I have a headache and feel dizzy since morning..."
            value={text} 
            onChange={(e) => setText(e.target.value)}
            style={{ resize: 'vertical', minHeight: '120px' }}
          ></textarea>
        </div>
        
        <button type="submit" className="btn" disabled={loading || !text.trim()}>
          {loading ? 'Analyzing...' : 'Analyze Symptoms'}
        </button>
      </form>
    </div>
  );
}

export default SymptomForm;
