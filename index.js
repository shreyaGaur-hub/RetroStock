import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import { simulateMonth, executeTrade } from "./simulationEngine.js";
import { createThread, sendNarration } from "./backboardService.js";

const app = express();
app.use(cors());
app.use(express.json());

const possibleStartDates = [
  "2000-01", // Dot-com
  "2008-01", // Great Recession
  "1999-06",
  "2007-06"
];

let gameState = null;

function getNextMonth(dateStr) {
  const [year, month] = dateStr.split("-").map(Number);
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  return `${nextYear}-${String(nextMonth).padStart(2, "0")}`;
}

app.post("/start", async (req, res) => {
  const threadId = await createThread();
  const randomDate =
    possibleStartDates[
      Math.floor(Math.random() * possibleStartDates.length)
    ];

  gameState = {
    date: randomDate,
    portfolio: {
      cash: 4000,
      stocks: 6000
    },
    history: [],
    threadId,
    difficulty: req.body?.difficulty || "normal"
  };

  res.json(gameState);
});

app.post("/advance", async (req, res) => {
  const result = simulateMonth(
    gameState.date,
    gameState.portfolio
  );

  gameState.portfolio = result.updatedPortfolio;
  gameState.date = getNextMonth(gameState.date);

  const total =
    result.updatedPortfolio.cash +
    result.updatedPortfolio.stocks;

  gameState.history.push(total);

  const narration = await sendNarration(
    gameState.threadId,
    `
    Date: ${gameState.date}
    Monthly return: ${(result.monthlyReturn * 100).toFixed(2)}%
    Total portfolio value: ${total}
    Event: ${result.event || "No major events."}
    `
  );

  res.json({
    ...gameState,
    narration,
    bankrupt: total <= 0
  });
});

app.post("/trade", (req, res) => {
  const { type, amount } = req.body;

  gameState.portfolio = executeTrade(
    gameState.portfolio,
    type,
    amount
  );

  res.json(gameState);
});

app.listen(5000, () =>
  console.log("🚀 RetroStock server running on port 5000")
);
