import React, { useState } from "react";

function Portfolio({ portfolio, gameState, setGameState }) {
  const [amount, setAmount] = useState(1000);

  async function trade(type) {
    const confirmTrade = window.confirm(`Are you sure you want to ${type} $${amount} of stock?`);
    if (!confirmTrade) return;

    const res = await fetch("http://localhost:5000/trade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, amount: parseFloat(amount) })
    });
    
    const data = await res.json();
    setGameState(data);
  }

  const showPrediction = gameState && gameState.difficulty === "normal" && gameState.prediction;

  if (!portfolio) {
    return <div className="card">Loading portfolio...</div>;
  }

  return (
    <div style={{width: '350px', padding: '0.75rem'}}>
      <h2 style={{fontSize: '0.9rem', marginBottom: '0.5rem', color: '#fff'}}>Terminal</h2>
      
      {/* Balances: Horizontal Layout */}
      <div style={{
        display: 'flex', 
        justifyContent: 'space-between',
        gap: '10px', 
        marginBottom: '0.5rem',
        background: '#050509',
        padding: '0.4rem', 
        borderRadius: '4px',
        border: '1px solid #1e293b'
      }}>
        <div style={{textAlign: 'center', flex: 1}}>
          <div style={{color: '#94a3b8', fontSize: '0.65rem'}}>CASH</div>
          <div style={{fontSize: '1.1rem', fontWeight: 'bold', color: '#4ade80'}}>${portfolio.cash.toLocaleString()}</div>
        </div>
        <div style={{textAlign: 'center', flex: 1}}>
          <div style={{color: '#94a3b8', fontSize: '0.65rem'}}>STOCKS</div>
          <div style={{fontSize: '1.1rem', fontWeight: 'bold', color: '#38bdf8'}}>${portfolio.stocks.toLocaleString()}</div>
        </div>
      </div>

      {/* Trade Controls: Single Line */}
      <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            backgroundColor: '#050509',
            border: '1px solid #334155',
            color: '#fff',
            padding: '0.25rem', 
            borderRadius: '4px',
            fontSize: '0.8rem',
            width: '100px',
            boxSizing: 'border-box'
          }}
        />
        <button onClick={() => trade("buy")} style={{flex: 1, padding: '0.25rem', borderColor: '#4ade80', color: '#4ade80', fontSize: '0.7rem'}}>BUY</button>
        <button onClick={() => trade("sell")} style={{flex: 1, padding: '0.25rem', borderColor: '#f87171', color: '#f87171', fontSize: '0.7rem'}}>SELL</button>
      </div>

      {showPrediction && (
        <div style={{
          marginTop: '0.5rem',
          padding: '0.4rem',
          background: 'rgba(56, 189, 248, 0.05)',
          borderLeft: '2px solid #38bdf8',
          fontSize: '0.7rem',
          color: '#38bdf8'
        }}>
          {gameState.prediction}
        </div>
      )}
    </div>
  );
}

export default Portfolio;