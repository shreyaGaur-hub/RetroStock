import { getMonthlyReturn, getEvent } from "./historicalData.js";

export function simulateMonth(currentDate, portfolio) {
  const monthlyReturn = getMonthlyReturn(currentDate);

  // Calculate new stock value based on monthly return
  const updatedStocks = portfolio.stocks * (1 + monthlyReturn);

  const updatedPortfolio = {
    cash: portfolio.cash,
    stocks: parseFloat(updatedStocks.toFixed(2))
  };

  const total =
    updatedPortfolio.cash + updatedPortfolio.stocks;

  return {
    updatedPortfolio,
    total: parseFloat(total.toFixed(2)),
    monthlyReturn,
    event: getEvent(currentDate)
  };
}

export function executeTrade(portfolio, type, amount) {
  let newPortfolio = {...portfolio};
  
  if (type === "buy" && newPortfolio.cash >= amount) {
    newPortfolio.cash -= amount;
    newPortfolio.stocks += amount;
  }

  if (type === "sell" && newPortfolio.stocks >= amount) {
    newPortfolio.stocks -= amount;
    newPortfolio.cash += amount;
  }

  return {
    cash: parseFloat(newPortfolio.cash.toFixed(2)),
    stocks: parseFloat(newPortfolio.stocks.toFixed(2))
  };
}