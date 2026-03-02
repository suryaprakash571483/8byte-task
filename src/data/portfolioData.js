// portfolioData.js - Your stock portfolio data
// Edit this file to add/remove stocks from your portfolio

const portfolioData = [
  // ---- FINANCIALS SECTOR ----
  {
    id: 1,
    name: 'HDFC Bank',
    sector: 'Financials',
    exchange: 'NSE',
    symbol: 'HDFCBANK',
    purchasePrice: 1450,
    qty: 10
  },
  {
    id: 2,
    name: 'ICICI Bank',
    sector: 'Financials',
    exchange: 'NSE',
    symbol: 'ICICIBANK',
    purchasePrice: 900,
    qty: 15
  },
  {
    id: 3,
    name: 'State Bank of India',
    sector: 'Financials',
    exchange: 'NSE',
    symbol: 'SBIN',
    purchasePrice: 550,
    qty: 20
  },

  // ---- TECHNOLOGY SECTOR ----
  {
    id: 4,
    name: 'Infosys',
    sector: 'Technology',
    exchange: 'NSE',
    symbol: 'INFY',
    purchasePrice: 1400,
    qty: 8
  },
  {
    id: 5,
    name: 'TCS',
    sector: 'Technology',
    exchange: 'NSE',
    symbol: 'TCS',
    purchasePrice: 3200,
    qty: 5
  },
  {
    id: 6,
    name: 'Wipro',
    sector: 'Technology',
    exchange: 'BSE',
    symbol: 'WIPRO',
    purchasePrice: 420,
    qty: 25
  },

  // ---- ENERGY SECTOR ----
  {
    id: 7,
    name: 'Reliance Industries',
    sector: 'Energy',
    exchange: 'NSE',
    symbol: 'RELIANCE',
    purchasePrice: 2400,
    qty: 6
  },
  {
    id: 8,
    name: 'ONGC',
    sector: 'Energy',
    exchange: 'NSE',
    symbol: 'ONGC',
    purchasePrice: 180,
    qty: 50
  },

  // ---- CONSUMER GOODS SECTOR ----
  {
    id: 9,
    name: 'Hindustan Unilever',
    sector: 'Consumer Goods',
    exchange: 'NSE',
    symbol: 'HINDUNILVR',
    purchasePrice: 2600,
    qty: 4
  },
  {
    id: 10,
    name: 'ITC',
    sector: 'Consumer Goods',
    exchange: 'NSE',
    symbol: 'ITC',
    purchasePrice: 430,
    qty: 30
  }
];

export default portfolioData;