import React, { useState } from "react";
import Dashboard from "./Dashboard";
import "./App.css";
// --- IMPORT LOGO ---
import logo from "./assets/logo.png"; // Use the real filename
// -------------------

function App() {
  const [gameState, setGameState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState("normal");
  const [gameStarted, setGameStarted] = useState(false);

  const lastScore = localStorage.getItem("lastScore");

  async function startGame() {
    setLoading(true);
    setGameStarted(true);

    const res = await fetch("http://localhost:5000/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        difficulty: difficulty
      })
    });

    const data = await res.json();
    setGameState(data);
    setLoading(false);
  }

  return (
    <div className="app-container">
      <div className="dashboard-header">
        {/* --- UPDATED TITLE SECTION --- */}
        <h1 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src={logo} alt="RetroStock Logo" style={{ height: "80px" }} />
          RetroStock <span style={{color: '#8b5cf6'}}>Simulator</span>
        </h1>
        {/* ----------------------------- */}
        
        <div style={{display: 'flex', alignItems: 'center'}}>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            disabled={gameStarted}
          >
            <option value="normal">Normal</option>
            <option value="hardcore">Hardcore</option>
          </select>
          <button onClick={startGame} disabled={gameStarted && loading}>
            {gameStarted ? "Restart" : "Start Game"}
          </button>
        </div>
      </div>

      {!gameStarted && (
        <div style={{textAlign: 'center', marginTop: '50px'}}>
          <h2>Welcome to RetroStock</h2>
          <p>Select difficulty and press Start Game to begin your survival simulation.</p>
        </div>
      )}

      {gameStarted && loading && (
        <p>Loading market conditions...</p>
      )}

      {gameStarted && !loading && gameState && (
        <>
          {lastScore && (
            <h3 style={{color: '#a78bfa', marginTop: '0'}}>🏆 Last Survival: {lastScore} months</h3>
          )}
          <Dashboard
            gameState={gameState}
            setGameState={setGameState}
          />
        </>
      )}
    </div>
  );
}

export default App;
