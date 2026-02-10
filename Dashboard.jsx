import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
import Timer from "./Timer";
import Portfolio from "./Portfolio";
import NewsTicker from "./NewsTicker";
import PortfolioChart from "./PortfolioChart.jsx";

function Dashboard({ gameState, setGameState }) {
  const dateRef = useRef(null);
  const portfolioRef = useRef(null);
  const chartRef = useRef(null);
  const timerRef = useRef(null);
  const tickerRef = useRef(null);

  const [advancing, setAdvancing] = useState(false);

  async function advanceMonth() {
    setAdvancing(true);
    const res = await fetch("http://localhost:5000/advance", {
      method: "POST"
    });
    const data = await res.json();
    if (data.bankrupt) {
      alert("💀 SYSTEM FAILURE: You went bankrupt!");
      localStorage.setItem("lastScore", data.history.length);
      window.location.reload();
    }
    setGameState(data);
    setAdvancing(false);
  }

  return (
    <div className="dashboard-grid">
      
      {/* --- UPDATED: Minimal padding, removed extra height --- */}
      <Draggable nodeRef={dateRef} handle=".card">
        <div ref={dateRef} className="card neon-border slot-date" style={{cursor: 'grab', padding: '0.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 'fit-content'}}>
          <h2 style={{fontSize: '0.7rem', color: '#94a3b8', letterSpacing: '2px', margin: 0, textAlign: 'center'}}>DATE</h2>
          <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', lineHeight: '1', textAlign: 'center'}}>{gameState.date}</div>
        </div>
      </Draggable>

      {/* Portfolio Card */}
      <Draggable nodeRef={portfolioRef} handle=".card">
        <div ref={portfolioRef} className="card slot-portfolio" style={{cursor: 'grab'}}>
          <Portfolio portfolio={gameState.portfolio} gameState={gameState} setGameState={setGameState} />
        </div>
      </Draggable>
        
      {/* Chart Card */}
      <Draggable nodeRef={chartRef} handle=".card">
        <div ref={chartRef} className="card slot-chart" style={{cursor: 'grab'}}>
          <h2 style={{fontSize: '1.2rem', color: '#fff'}}>Performance History</h2>
          <PortfolioChart history={gameState.history} />
        </div>
      </Draggable>

      {/* Timer Card */}
      <Draggable nodeRef={timerRef} handle=".card">
        <div ref={timerRef} className="card neon-border slot-timer" style={{textAlign: 'center', cursor: 'grab'}}>
          <Timer onTick={advanceMonth} advancing={advancing} />
        </div>
      </Draggable>

      {/* News Ticker Card */}
      <Draggable nodeRef={tickerRef} handle=".card">
        <div ref={tickerRef} className="card slot-ticker" style={{borderColor: '#1e293b', cursor: 'grab'}}>
          {advancing ? (
            <p style={{color: '#38bdf8', textAlign: 'center'}}>Processing New Month...</p>
          ) : (
            <NewsTicker narration={gameState.narration} />
          )}
        </div>
      </Draggable>
    </div>
  );
}

export default Dashboard;