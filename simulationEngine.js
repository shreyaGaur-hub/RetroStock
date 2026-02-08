import { getMonthlyReturn, getEvent } from "./historicalData.js";

export function simulateMonth(currentDate, portfolio) {
  const monthlyReturn = getMonthlyReturn(currentDate);

  const updatedStocks = portfolio.stocks * (1 + monthlyReturn);

  const updatedPortfolio = {
    cash: portfolio.cash,
    stocks: parseFloat(updatedStocks.toFixed(2))
  };

  const total =
    updatedPortfolio.cash + updatedPortfolio.stocks;

  return {
    updatedPortfolio,
    total,
    monthlyReturn,
    event: getEvent(currentDate)
  };
}

export function executeTrade(portfolio, type, amount) {
  if (type === "buy" && portfolio.cash >= amount) {
    portfolio.cash -= amount;
    portfolio.stocks += amount;
  }

  if (type === "sell" && portfolio.stocks >= amount) {
    portfolio.stocks -= amount;
    portfolio.cash += amount;
  }

  return portfolio;
}
