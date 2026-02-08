import React from "react";

function Portfolio({ portfolio, setGameState }) {
  async function trade(type) {
    const res = await fetch("http://localhost:5000/trade", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type,
        amount: 1000
      })
    });

    const data = await res.json();
    setGameState(data);
  }

  return (
    <div>
      <h2>Portfolio</h2>
      <p>Cash: ${portfolio.cash}</p>
      <p>Stocks: ${portfolio.stocks}</p>
      <p>Total: ${portfolio.cash + portfolio.stocks}</p>

      <button onClick={() => trade("buy")}>
        Buy $1000
      </button>

      <button onClick={() => trade("sell")}>
        Sell $1000
      </button>
    </div>
  );
}

export default Portfolio;
