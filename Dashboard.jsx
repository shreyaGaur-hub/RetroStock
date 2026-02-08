import React from "react";
import Timer from "./Timer";
import Portfolio from "./Portfolio";
import NewsTicker from "./NewsTicker";
import PortfolioChart from "./PortfolioChart.jsx";

function Dashboard({ gameState, setGameState }) {
  async function advanceMonth() {
    const res = await fetch("http://localhost:5000/advance", {
      method: "POST"
    });

    const data = await res.json();

    if (data.bankrupt) {
      alert("💀 You went bankrupt!");
      localStorage.setItem(
        "lastScore",
        data.history.length
      );
      window.location.reload();
    }

    setGameState(data);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>RetroStock Survival Simulator</h1>
      <h3>Current Date: {gameState.date}</h3>

      <Timer onTick={advanceMonth} />

      <Portfolio
        portfolio={gameState.portfolio}
        setGameState={setGameState}
      />

    {gameState.history && (
      <PortfolioChart history={gameState.history} />
    )}

      <NewsTicker narration={gameState.narration} />
    </div>
  );
}

export default Dashboard;
