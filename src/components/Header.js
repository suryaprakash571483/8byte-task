

function Header({ lastUpdated, refreshing, onRefresh, summary }) {
  return (
    <header className="app-header">
      <div className="header-top">
        <h1>  Portfolio </h1>
        <div className="header-controls">
          <span className="last-updated">
            {lastUpdated ? `Last updated: ${lastUpdated}` : 'Loading...'}
          </span>
          <button
            className="refresh-btn"
            onClick={onRefresh}
            disabled={refreshing}
          >
            {refreshing ? '🔄 Refreshing...' : '🔃 Refresh Now'}
          </button>
        </div>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <span className="card-label">Total Investment</span>
          <span className="card-value">₹{summary.totalInvestment.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="summary-card">
          <span className="card-label">Present Value</span>
          <span className="card-value">₹{summary.totalPresentValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
        </div>
        <div className={`summary-card ${summary.totalGainLoss >= 0 ? 'gain' : 'loss'}`}>
          <span className="card-label">Total Gain / Loss</span>
          <span className="card-value">
            {summary.totalGainLoss >= 0 ? '▲' : '▼'} ₹{Math.abs(summary.totalGainLoss).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;