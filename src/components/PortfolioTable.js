//Displays stocks in a table with all required columns
import React, { useMemo } from 'react';

// Format number to Indian Rupee format
function formatINR(value) {
  if (value === null || value === undefined || isNaN(value)) return '—';
  return '₹' + Number(value).toLocaleString('en-IN', { minimumFractionDigits: 2 });
}

function PortfolioTable({ stocks }) {
  // memoized for performance
  const totals = useMemo(() => {
    return stocks.reduce(
      (acc, stock) => {
        acc.investment += stock.investment || 0;
        acc.presentValue += stock.presentValue || 0;
        acc.gainLoss += stock.gainLoss || 0;
        return acc;
      },
      { investment: 0, presentValue: 0, gainLoss: 0 }
    );
  }, [stocks]);

  return (
    <div className="table-wrapper">
      <table className="portfolio-table">
        <thead>
          <tr>
            <th>Particulars</th>
            <th>Purchase Price</th>
            <th>Qty</th>
            <th>Investment</th>
            <th>Portfolio %</th>
            <th>NSE / BSE</th>
            <th>CMP</th>
            <th>Present Value</th>
            <th>Gain / Loss</th>
            <th>P/E Ratio</th>
            <th>Latest Earnings</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => {
            const isGain = stock.gainLoss >= 0;

            return (
              <tr key={stock.id}>
                {/* Stock Name */}
                <td className="stock-name">
                  {stock.name}
                  {stock.cmpFailed && (
                    <span className="data-warn" title="Live price unavailable"> ⚠️</span>
                  )}
                </td>

                {/* Purchase Price */}
                <td>{formatINR(stock.purchasePrice)}</td>

                {/* Quantity */}
                <td>{stock.qty}</td>

                {/* Investment = Purchase Price × Qty */}
                <td>{formatINR(stock.investment)}</td>

                {/* Portfolio Weight % */}
                <td>{stock.portfolioPercent}%</td>

                {/* Exchange */}
                <td>
                  <span className="exchange-badge">{stock.exchange}</span>
                </td>

                {/* CMP - Current Market Price */}
                <td className="cmp">{formatINR(stock.cmp)}</td>

                {/* Present Value = CMP × Qty */}
                <td>{formatINR(stock.presentValue)}</td>

                {/* Gain / Loss - colored green or red */}
                <td className={isGain ? 'gain' : 'loss'}>
                  {isGain ? '▲' : '▼'} {formatINR(Math.abs(stock.gainLoss))}
                </td>

                {/* P/E Ratio */}
                <td>{stock.peRatio || 'N/A'}</td>

                {/* Latest Earnings */}
                <td className="earnings">{stock.latestEarnings || 'N/A'}</td>
              </tr>
            );
          })}
        </tbody>

        {/* Footer row with totals */}
        <tfoot>
          <tr className="total-row">
            <td colSpan={3}><strong>Sector Total</strong></td>
            <td><strong>{formatINR(totals.investment)}</strong></td>
            <td colSpan={3}></td>
            <td><strong>{formatINR(totals.presentValue)}</strong></td>
            <td className={totals.gainLoss >= 0 ? 'gain' : 'loss'}>
              <strong>
                {totals.gainLoss >= 0 ? '▲' : '▼'} {formatINR(Math.abs(totals.gainLoss))}
              </strong>
            </td>
            <td colSpan={2}></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// React.memo 
export default React.memo(PortfolioTable);