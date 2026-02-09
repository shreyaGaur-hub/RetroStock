import React, { useState } from "react";                

function Portfolio({ portfolio, setGameState }) {                
  const [amount, setAmount] = useState(1000);                

  async function trade(type) {                
    const res = await fetch("http://localhost:5000/trade", {                
      method: "POST",                
      headers: { "Content-Type": "application/json" },                
      body: JSON.stringify({ type, amount: parseFloat(amount) })                
    });                
    const data = await res.json();                
    setGameState(data);                
  }                

  return (                
    <div className="card">                
      <h2>Portfolio</h2>                
      <div style={{display: 'flex', gap: '30px', marginBottom: '1.5rem'}}>                
        <p>Cash: <strong>${portfolio.cash.toLocaleString()}</strong></p>                
        <p>Stocks: <strong>${portfolio.stocks.toLocaleString()}</strong></p>                
      </div>                

      {/* Spacing container for inputs and buttons */}                
      <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>                
        <input                
          type="number"                
          value={amount}                
          onChange={(e) => setAmount(e.target.value)}                
        />                
        <button onClick={() => trade("buy")}>Buy</button>                
        <button onClick={() => trade("sell")}>Sell</button>                
      </div>                
    </div>                
  );                
}                

export default Portfolio;
