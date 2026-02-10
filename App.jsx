import React, { useState } from "react";
import Dashboard from "./Dashboard";
import "./App.css";
import logo from "./assets/logo.png"; 

function App() {
  const [gameState, setGameState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState("normal");
  const [gameStarted, setGameStarted] = useState(false);

  async function startGame() {
    setLoading(true);
    setGameStarted(true);

    const res = await fetch("http://localhost:5000/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ difficulty: difficulty })
    });

    const data = await res.json();
    setGameState(data);
    setLoading(false);
  }

  return (
    <div className="app-container" style={{paddingTop: '100px'}}>
      {/* --- UPDATED HEADER LAYOUT --- */}
      <div className="dashboard-header" style={{
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingLeft: '40px', // Left margin for logo
        paddingRight: '40px'
      }}>
        
        <h1 style={{ display: "flex", alignItems: "center", gap: "15px", fontSize: '3rem', margin: 0 }}>
          <img 
            src={logo} 
            alt="RetroStock Logo" 
            style={{ 
              height: "80px", 
              borderRadius: "15px",
              filter: 'drop-shadow(0 0 8px #38bdf8)' 
            }} 
          />
          <span className="neon-text" style={{color: '#fff'}}>RETRO</span>
          <span style={{color: '#38bdf8'}}>STOCK</span>
        </h1>
        
        {/* --- Difficulty and Restart now on the Right --- */}
        <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} disabled={gameStarted}>
            <option value="normal">Normal</option>
            <option value="hardcore">Hardcore</option>
          </select>
          <button onClick={startGame} disabled={loading}>
            {gameStarted ? "Restart" : "Initialize"}
          </button>
        </div>
      </div>

      {!gameStarted && (
        <div style={{textAlign: 'center', marginTop: '100px', border: '1px solid #1e293b', padding: '3rem', borderRadius: '4px', margin: '150px auto', maxWidth: '600px'}}>
          <h2 style={{fontSize: '2rem'}}>Welcome to RetroStock</h2>
          <p style={{color: '#94a3b8', marginBottom: '2rem'}}>Select difficulty and press Initialize to begin your survival simulation.</p>
        </div>
      )}

      {gameStarted && loading && (
        <p style={{textAlign: 'center', color: '#38bdf8', marginTop: '100px', fontSize: '1.5rem'}}>LOADING MARKET DATA...</p>
      )}

      {gameStarted && !loading && gameState && (
        <Dashboard gameState={gameState} setGameState={setGameState} />
      )}
    </div>
  );
}

export default App;