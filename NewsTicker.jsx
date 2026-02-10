import React from "react";

function NewsTicker({ narration }) {
  return (
    <div className="card" style={{borderColor: '#1e293b'}}>
      <h2 style={{fontSize: '1.2rem', marginBottom: '1rem', color: '#38bdf8'}}>Market Analysis</h2>
      
      {!narration ? (
        <p style={{color: '#475569', fontStyle: 'italic'}}>Waiting for initial data stream...</p>
      ) : (
        <div style={{
          fontSize: '0.9rem', 
          color: '#e2e8f0', 
          lineHeight: '1.6',
          height: '300px',
          overflowY: 'auto',
          paddingRight: '5px'
        }}>
          <p style={{ whiteSpace: "pre-wrap" }}>{narration}</p>
        </div>
      )}
    </div>
  );
}

export default NewsTicker;