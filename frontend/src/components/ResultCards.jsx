import React from 'react';

function ResultCards({ results }) {
  if (!results) return null;

  return (
    <div style={{ marginTop: '20px' }}>
      <h2 style={{ paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '20px' }}>
        Analysis Results
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        
        {/* SYMPTOM ANALYSIS TEXT MODE */}
        {results.type === 'text_analysis' && results.symptoms_analysis && (
          <div className="card">
            <h3 style={{ color: 'var(--accent-color)' }}>Symptom Analysis</h3>
            <p><strong>Severity:</strong> <span style={{ textTransform: 'capitalize' }}>{results.symptoms_analysis.severity || 'Unknown'}</span></p>
            <div>
              <strong>Conditions:</strong>
              <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                {(results.symptoms_analysis.conditions || []).map((cond, idx) => (
                  <li key={idx}>{cond}</li>
                ))}
              </ul>
            </div>
            <p><strong>Advice:</strong> {results.symptoms_analysis.advice || 'No advice provided'}</p>
          </div>
        )}

        {/* REPORT AGENT SUMMARY */}
        {results.type === 'report_analysis' && results.report_analysis && (
          <>
            <div className="card" style={{ gridColumn: '1 / -1' }}>
              <h3 style={{ color: 'var(--accent-color)' }}>Report Summary</h3>
              <p>{results.report_analysis.summary || 'No summary available.'}</p>
            </div>
            
            <div className="card">
              <h3 style={{ color: '#ff8a8a' }}>Abnormalities</h3>
              {results.report_analysis.abnormalities?.length > 0 ? (
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                  {results.report_analysis.abnormalities.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>No abnormalities detected.</p>
              )}
            </div>

            <div className="card">
              <h3 style={{ color: '#ffb347' }}>Health Concerns</h3>
              {results.report_analysis.concerns?.length > 0 ? (
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                  {results.report_analysis.concerns.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>No concerns highlighted.</p>
              )}
            </div>
          </>
        )}

        {/* RISK ANALYSIS */}
        {results.risk_analysis && (
          <div className="card">
            <h3 style={{ color: 'var(--accent-color)' }}>Risk Analysis</h3>
            <p><strong>Risk Level:</strong> <span style={{ textTransform: 'capitalize' }}>{results.risk_analysis.risk_level}</span></p>
            <p><strong>Urgency:</strong> <span style={{ textTransform: 'capitalize' }}>{results.risk_analysis.urgency}</span></p>
            <p><strong>Reasoning:</strong> {results.risk_analysis.reason}</p>
          </div>
        )}

        {/* INSURANCE RECOMMENDATION */}
        {results.insurance_recommendation && (
          <div className="card" style={{ gridColumn: '1 / -1', borderLeft: '4px solid var(--accent-color)' }}>
            <h3 style={{ color: 'var(--accent-color)' }}>Insurance Recommendation</h3>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '15px' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px 15px', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Risk Category</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', textTransform: 'capitalize' }}>
                  {results.insurance_recommendation.risk_category}
                </div>
              </div>
              <div style={{ background: 'rgba(203, 183, 251, 0.1)', padding: '10px 15px', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Recommended Policy</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', textTransform: 'capitalize', color: 'var(--accent-color)' }}>
                  {results.insurance_recommendation.recommended_policy}
                </div>
              </div>
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <strong>Key Health Flags:</strong>
              {results.insurance_recommendation.key_flags?.length > 0 ? (
                <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                  {results.insurance_recommendation.key_flags.map((flag, idx) => (
                    <li key={idx}>{flag}</li>
                  ))}
                </ul>
              ) : (
                <p>No major flags identified.</p>
              )}
            </div>
            <p><strong>Notes:</strong> {results.insurance_recommendation.notes}</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default ResultCards;
