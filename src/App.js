
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import portfolioData from './data/portfolioData';
import PortfolioTable from './components/PortfolioTable';
import SectorSummary from './components/SectorSummary';
import Header from './components/Header';
import './App.css';

const BACKEND_URL = 'http://localhost:5000';
const REFRESH_INTERVAL = 15000; // 15 seconds

function App() {
  // State 
  const [stocks, setStocks] = useState(portfolioData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // ---- Fetch CMP from backend
  const fetchCMP = useCallback(async (symbol) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/stock/${symbol}`);
      const data = await response.json();
      return data.cmp || null;
    } catch (err) {
      console.error(`Failed to fetch CMP for ${symbol}`, err);
      return null;
    }
  }, []);

  //  Fetch Fundamentals from backend (P/E, Earnings) 
  const fetchFundamentals = useCallback(async (symbol) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/fundamentals/${symbol}`);
      const data = await response.json();
      return {
        peRatio: data.peRatio || 'N/A',
        latestEarnings: data.latestEarnings || 'N/A'
      };
    } catch (err) {
      console.error(`Failed to fetch fundamentals for ${symbol}`, err);
      return { peRatio: 'N/A', latestEarnings: 'N/A' };
    }
  }, []);

  //  Update all stocks with live data
  const updateAllStocks = useCallback(async () => {
    setRefreshing(true);
    setError(null);

    try {
      // Fetch all data in parallel using Promise.all
      const updatedStocks = await Promise.all(
        portfolioData.map(async (stock) => {
          const [cmp, fundamentals] = await Promise.all([
            fetchCMP(stock.symbol),
            fetchFundamentals(stock.symbol)
          ]);

          const currentCMP = cmp || stock.purchasePrice; // fallback to purchase price
          const investment = stock.purchasePrice * stock.qty;
          const presentValue = currentCMP * stock.qty;
          const gainLoss = presentValue - investment;

          return {
            ...stock,
            cmp: currentCMP,
            cmpFailed: cmp === null, // flag if fetch failed
            investment,
            presentValue,
            gainLoss,
            peRatio: fundamentals.peRatio,
            latestEarnings: fundamentals.latestEarnings
          };
        })
      );

      // Calculate total portfolio value for portfolio %
      const totalInvestment = updatedStocks.reduce((sum, s) => sum + s.investment, 0);

      const finalStocks = updatedStocks.map((stock) => ({
        ...stock,
        portfolioPercent: ((stock.investment / totalInvestment) * 100).toFixed(2)
      }));

      setStocks(finalStocks);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError('Failed to load some stock data. Showing available data.');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [fetchCMP, fetchFundamentals]);

  //  Initial load 
  useEffect(() => {
    updateAllStocks();
  }, [updateAllStocks]);

  //  Auto-refresh every 15 seconds 
  useEffect(() => {
    const interval = setInterval(() => {
      updateAllStocks();
    }, REFRESH_INTERVAL);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [updateAllStocks]);

  //  Group stocks by sector using useMemo (performance optimization) 
  const stocksBySector = useMemo(() => {
    const grouped = {};
    stocks.forEach((stock) => {
      if (!grouped[stock.sector]) {
        grouped[stock.sector] = [];
      }
      grouped[stock.sector].push(stock);
    });
    return grouped;
  }, [stocks]);

  //  Calculate total portfolio summary 
  const portfolioSummary = useMemo(() => {
    const totalInvestment = stocks.reduce((sum, s) => sum + (s.investment || 0), 0);
    const totalPresentValue = stocks.reduce((sum, s) => sum + (s.presentValue || 0), 0);
    const totalGainLoss = totalPresentValue - totalInvestment;
    return { totalInvestment, totalPresentValue, totalGainLoss };
  }, [stocks]);

  //  Loading screen 
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading Portfolio Data...</p>
        <small>Fetching live prices from Yahoo Finance...</small>
      </div>
    );
  }

  return (
    <div className="app">
      <Header
        lastUpdated={lastUpdated}
        refreshing={refreshing}
        onRefresh={updateAllStocks}
        summary={portfolioSummary}
      />

      {/* Error Banner */}
      {error && (
        <div className="error-banner">
          ⚠️ {error}
        </div>
      )}

      {/* Disclaimer */}
      <div className="disclaimer">
        ⚠️ Disclaimer: Stock data is fetched from unofficial APIs and may be delayed or inaccurate.
        Not for investment decisions. Data auto-refreshes every 15 seconds.
      </div>

      {/* Sector-wise Tables */}
      <div className="content">
        {Object.keys(stocksBySector).map((sector) => (
          <div key={sector} className="sector-block">
            <h2 className="sector-title">{sector}</h2>
            <PortfolioTable stocks={stocksBySector[sector]} />
            <SectorSummary stocks={stocksBySector[sector]} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;