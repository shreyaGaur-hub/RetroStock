import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";

function App() {
  const [gameState, setGameState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [difficulty, setDifficulty] = useState("normal");

  const lastScore = localStorage.getItem("lastScore");

  async function startGame(selectedDifficulty = difficulty) {
    setLoading(true);

    const res = await fetch("http://localhost:5000/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        difficulty: selectedDifficulty
      })
    });

    const data = await res.json();
    setGameState(data);
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      await startGame();
    })();
  }, []);

  if (loading || !gameState) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>RetroStock Survival Simulator</h1>
        <p>Loading market conditions...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>RetroStock Survival Simulator</h1>

      {lastScore && (
        <h3>🏆 Last Survival: {lastScore} months</h3>
      )}

      <div style={{ marginBottom: "15px" }}>
        <label>Difficulty: </label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="normal">Normal</option>
          <option value="hardcore">Hardcore (Leverage)</option>
        </select>

        <button
          style={{ marginLeft: "10px" }}
          onClick={() => startGame(difficulty)}
        >
          Restart Game
        </button>
      </div>

      <Dashboard
        gameState={gameState}
        setGameState={setGameState}
      />
    </div>
  );
}

export default App;
