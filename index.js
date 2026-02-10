import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// These functions exist in your simulationEngine.js and backboardService.js
import { simulateMonth, executeTrade } from "./simulationEngine.js";
import { createThread, sendNarration } from "./backboardService.js";

const app = express();
app.use(cors());
app.use(express.json());

const possibleStartDates = [
  "2000-01",
  "2008-01",
  "1999-06",
  "2007-06"
];

let gameState = null;
let gameThreadId = null;

function getNextMonth(dateStr) {
  const [year, month] = dateStr.split("-").map(Number);
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  return `${nextYear}-${String(nextMonth).padStart(2, "0")}`;
}

// Function to handle the AI narration for market news and decision analysis
async function updateNarration(state, result) {
  const total = result.updatedPortfolio.cash + result.updatedPortfolio.stocks;
  
  const tradeHistory = JSON.stringify(state.trades || []);
  
  try {
    const prompt = `
    Date: ${state.date}
    Total Value: $${total.toFixed(2)}
    Monthly Return: ${(result.monthlyReturn * 100).toFixed(2)}%
    Market Event: ${result.event || "None"}
    Trades this month: ${tradeHistory}
    `;
    return await sendNarration(gameThreadId, prompt);
  } catch (error) {
    console.error("AI Narration Error:", error);
    return "AI Advisor currently offline. Market data processing...";
  }
}

app.post("/start", async (req, res) => {
  const { difficulty } = req.body;
  
  // Initialize new game state
  gameThreadId = await createThread();
  
  gameState = {
    date: possibleStartDates[Math.floor(Math.random() * possibleStartDates.length)],
    portfolio: { cash: 10000, stocks: 0 },
    history: [10000],
    difficulty: difficulty || "normal",
    trades: [],
    narration: "Initializing market simulation...",
    prediction: "Market stable."
  };

  // Generate initial narration immediately for the startup
  const dummyResult = { total: 10000, monthlyReturn: 0, event: "Simulation Start", updatedPortfolio: gameState.portfolio };
  gameState.narration = await updateNarration(gameState, dummyResult);

  res.json(gameState);
});

app.post("/advance", async (req, res) => {
  if (!gameState) return res.status(400).json({ error: "Game not started" });
  
  // 1. Update Portfolio and History
  const result = simulateMonth(gameState.date, gameState.portfolio);
  gameState.portfolio = result.updatedPortfolio;
  gameState.history.push(result.total);
  
  // 2. Generate AI Narration
  gameState.narration = await updateNarration(gameState, result);

  // 3. Increment Date and Reset Trades
  gameState.date = getNextMonth(gameState.date);
  gameState.trades = []; 

  // 4. Dynamic AI Prediction
  let prediction = "Market stable.";
  if (gameState.difficulty === "normal") {
    if (result.monthlyReturn > 0.02) prediction = "AI Advisor: Bullish trend detected. Consider buying.";
    else if (result.monthlyReturn < -0.02) prediction = "AI Advisor: Bearish trend detected. Consider selling.";
    else prediction = "AI Advisor: Market is volatile. Tread carefully.";
  }

  res.json({
    ...gameState,
    prediction,
    bankrupt: result.total <= 0
  });
});

app.post("/trade", (req, res) => {
  if (!gameState) return res.status(400).json({ error: "Game not started" });
  
  const { type, amount } = req.body;
  gameState.portfolio = executeTrade(gameState.portfolio, type, amount);
  gameState.trades.push({ type, amount, date: gameState.date });
  
  res.json(gameState);
});

app.listen(5000, () => console.log("Server running on port 5000"));