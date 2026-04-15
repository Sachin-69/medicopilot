import React, { useState } from 'react';

function ReportUpload({ setResults }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'application/pdf') {
        setError("Only PDF files are supported.");
        setFile(null);
      } else {
        setError(null);
        setFile(selectedFile);
      }
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);
    setResults(null); 

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/analyze-report', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let errDetail = response.statusText;
        try {
            const errorData = await response.json();
            if (errorData.detail) errDetail = typeof errorData.detail === 'string' ? errorData.detail : JSON.stringify(errorData.detail);
        } catch(e) {}
        throw new Error(errDetail);
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
      <h2>Upload Medical Report</h2>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div className="form-group">
          <label htmlFor="report-file">Select PDF File</label>
          <input 
            type="file" 
            id="report-file" 
            accept="application/pdf"
            onChange={handleFileChange} 
          />
        </div>
        
        <button type="submit" className="btn" disabled={loading || !file}>
          {loading ? 'Uploading & Analyzing...' : 'Upload & Analyze'}
        </button>
      </form>
    </div>
  );
}

export default ReportUpload;
