const historicalReturns = {
  "2008-01": -0.06,
  "2008-02": -0.05,
  "2008-03": -0.04,
  "2008-09": -0.12,
  "2008-10": -0.17,
  "2008-11": -0.07,
  "2009-03": -0.09
};

const historicalEvents = {
  "2008-09": "Lehman Brothers collapses. Panic spreads.",
  "2008-10": "Markets crash violently."
};

export function getMonthlyReturn(date) {
  return historicalReturns[date] || (Math.random() * 0.04 - 0.02);
}

export function getEvent(date) {
  return historicalEvents[date] || null;
}
