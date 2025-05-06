export const mockFinancialReport = (month: string) => ({
  month,
  revenue: 10000,
  expenses: 5000,
  profit: 5000,
  details: [
    { type: "mensalidade", value: 8000 },
    { type: "personal", value: 2000 },
    { type: "despesas", value: 5000 }
  ]
});
