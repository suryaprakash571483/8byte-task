
import React, { useMemo } from 'react';

function SectorSummary({ stocks }) {
  // Calculate sector summary 
  const summary = useMemo(() => {
    const totalInvestment = stocks.reduce((sum, s) => sum + (s.investment || 0), 0);
    const totalPresentValue = stocks.reduce((sum, s) => sum + (s.presentValue || 0), 0);
    const totalGainLoss = totalPresentValue - totalInvestment;
    const gainPercent = totalInvestment > 0
      ? ((totalGainLoss / totalInvestment) * 100).toFixed(2)
      : 0;

    return { totalInvestment, totalPresentValue, totalGainLoss, gainPercent };
  }, [stocks]);

  const isGain = summary.totalGainLoss >= 0;

  return (
    <div className="sector-summary">
      <div className="sector-summary-item">
        <span className="ss-label">Total Investment</span>
        <span className="ss-value">
          ₹{summary.totalInvestment.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </span>
      </div>
      <div className="sector-summary-item">
        <span className="ss-label"> Present Value</span>
        <span className="ss-value">
          ₹{summary.totalPresentValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </span>
      </div>
      <div className={`sector-summary-item ${isGain ? 'gain' : 'loss'}`}>
        <span className="ss-label">Sector Gain / Loss</span>
        <span className="ss-value">
          {isGain ? '▲' : '▼'} ₹{Math.abs(summary.totalGainLoss).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          <small> ({isGain ? '+' : ''}{summary.gainPercent}%)</small>
        </span>
      </div>
    </div>
  );
}

export default React.memo(SectorSummary);