import React from 'react';

function ResultCards({ results }) {
  if (!results) return null;

  const getRiskBadgeClass = (level) => {
    if (!level) return 'badge neutral';
    const l = level.toLowerCase();
    if (l.includes('low')) return 'badge low';
    if (l.includes('medium') || l.includes('moderate')) return 'badge medium';
    if (l.includes('high') || l.includes('severe')) return 'badge high';
    return 'badge neutral';
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <h2 style={{ paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '24px', fontSize: '1.8rem', fontWeight: 'bold' }}>
        Analysis Results
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }} className="results-grid">
        
        {/* SYMPTOM ANALYSIS TEXT MODE */}
        {results.type === 'text_analysis' && results.symptoms_analysis && (
          <div className="card" style={{ gridColumn: '1 / -1', margin: 0 }}>
            <h3 style={{ color: 'var(--accent-color)', fontSize: '1.4rem', fontWeight: 'bold' }}>Symptom Analysis</h3>
            <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontWeight: 500, color: 'var(--text-muted)', width: '100px' }}>Severity:</span>
              <span className={getRiskBadgeClass(results.symptoms_analysis.severity)}>
                {results.symptoms_analysis.severity || 'Unknown'}
              </span>
            </div>
            
            <div style={{ marginBottom: '12px' }}>
              <span style={{ fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Conditions:</span>
              <ul style={{ paddingLeft: '20px', margin: 0, fontWeight: 400 }}>
                {(results.symptoms_analysis.conditions || []).map((cond, idx) => (
                  <li key={idx} style={{ marginBottom: '6px' }}>{cond}</li>
                ))}
              </ul>
            </div>
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Advice:</span>
              <p style={{ margin: 0, fontWeight: 400 }}>{results.symptoms_analysis.advice || 'No advice provided'}</p>
            </div>
          </div>
        )}

        {/* REPORT AGENT SUMMARY */}
        {results.type === 'report_analysis' && results.report_analysis && (
          <>
            {/* ROW 1 */}
            <div className="card" style={{ gridColumn: '1 / -1', margin: 0 }}>
              <h3 style={{ color: 'var(--accent-color)', fontSize: '1.4rem', fontWeight: 'bold' }}>Report Summary</h3>
              <p style={{ fontWeight: 400, fontSize: '1.05rem', lineHeight: '1.6', margin: 0 }}>{results.report_analysis.summary || 'No summary available.'}</p>
            </div>
            
            {/* ROW 2 */}
            <div className="card" style={{ margin: 0 }}>
              <h3 style={{ color: '#ff8a8a', fontSize: '1.2rem', fontWeight: 'bold' }}>Abnormalities</h3>
              {results.report_analysis.abnormalities?.length > 0 ? (
                <ul style={{ paddingLeft: '20px', margin: 0, fontWeight: 400 }}>
                  {results.report_analysis.abnormalities.map((item, i) => (
                    <li key={i} style={{ marginBottom: '6px' }}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontWeight: 400, color: 'var(--text-muted)', margin: 0 }}>No abnormalities detected.</p>
              )}
            </div>

            <div className="card" style={{ margin: 0 }}>
              <h3 style={{ color: '#ffb347', fontSize: '1.2rem', fontWeight: 'bold' }}>Health Concerns</h3>
              {results.report_analysis.concerns?.length > 0 ? (
                <ul style={{ paddingLeft: '20px', margin: 0, fontWeight: 400 }}>
                  {results.report_analysis.concerns.map((item, i) => (
                    <li key={i} style={{ marginBottom: '6px' }}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontWeight: 400, color: 'var(--text-muted)', margin: 0 }}>No concerns highlighted.</p>
              )}
            </div>

            {/* ROW 3: Primary Risk Drivers */}
            {results.report_analysis['primary drivers']?.length > 0 && (
              <div className="card" style={{ margin: 0, border: '1px solid var(--accent-color)' }}>
                <h3 style={{ color: 'var(--accent-color)', fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>⚠️</span> Primary Risk Drivers
                </h3>
                <ul style={{ paddingLeft: '20px', margin: 0, fontWeight: 400 }}>
                  {results.report_analysis['primary drivers'].map((driver, i) => (
                    <li key={i} style={{ marginBottom: '6px' }}>{driver}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {/* ROW 3: RISK ANALYSIS */}
        {results.risk_analysis && (
          <div className="card" style={{ display: 'flex', flexDirection: 'column', margin: 0 }}>
            <h3 style={{ color: 'var(--accent-color)', fontSize: '1.2rem', fontWeight: 'bold' }}>Risk Analysis</h3>
            
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontWeight: 500, color: 'var(--text-muted)', width: '100px' }}>Risk Level:</span>
              <span className={getRiskBadgeClass(results.risk_analysis.risk_level)}>
                {results.risk_analysis.risk_level || 'Unknown'}
              </span>
            </div>
            
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontWeight: 500, color: 'var(--text-muted)', width: '100px' }}>Urgency:</span>
              <span className={getRiskBadgeClass(results.risk_analysis.urgency)}>
                {results.risk_analysis.urgency || 'Unknown'}
              </span>
            </div>
            
            <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Reasoning:</span>
              <p style={{ margin: 0, fontWeight: 400 }}>{results.risk_analysis.reason}</p>
            </div>
          </div>
        )}

        {/* ROW 4: INSURANCE RECOMMENDATION */}
        {results.insurance_recommendation && (
          <div className="card" style={{ 
              gridColumn: '1 / -1',
              border: '2px solid var(--accent-color)', 
              boxShadow: '0 0 20px rgba(203, 183, 251, 0.25)',
              padding: '28px',
              position: 'relative',
              margin: 0
            }}>
            <h3 style={{ color: 'var(--accent-color)', marginBottom: '24px', fontSize: '1.5rem', fontWeight: 'bold' }}>Insurance Recommendation</h3>
            
            <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '12px 16px', borderRadius: '8px' }}>
                <span style={{ fontWeight: 500, color: 'var(--text-muted)' }}>Risk Category</span>
                <span className={getRiskBadgeClass(results.insurance_recommendation.risk_category)}>
                  {results.insurance_recommendation.risk_category}
                </span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(203, 183, 251, 0.1)', border: '1px solid rgba(203, 183, 251, 0.3)', padding: '12px 16px', borderRadius: '8px' }}>
                <span style={{ fontWeight: 500, color: 'var(--accent-color)' }}>Recommended Policy</span>
                <span className="badge neutral" style={{ background: 'var(--accent-color)', color: '#0f0f1a', border: 'none', fontSize: '1rem', padding: '6px 16px' }}>
                  {results.insurance_recommendation.recommended_policy}
                </span>
              </div>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>Key Health Flags:</span>
              {results.insurance_recommendation.key_flags?.length > 0 ? (
                <ul style={{ paddingLeft: '20px', margin: 0, fontWeight: 400 }}>
                  {results.insurance_recommendation.key_flags.map((flag, idx) => (
                    <li key={idx} style={{ marginBottom: '8px' }}>{flag}</li>
                  ))}
                </ul>
              ) : (
                <p style={{ margin: 0, color: 'var(--text-muted)' }}>No major flags identified.</p>
              )}
            </div>
            
            <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontWeight: 500, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Notes:</span>
              <p style={{ margin: 0, fontWeight: 400, color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>{results.insurance_recommendation.notes}</p>
            </div>
          </div>
        )}

      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
           .results-grid { grid-template-columns: 1fr !important; }
        }
      `}} />
    </div>
  );
}

export default ResultCards;
