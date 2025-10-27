import React from 'react'

export default function Header({ totalWealth, totalCost, totalProfit }) {
  const totalPercent = totalCost ? ((totalProfit / totalCost) * 100).toFixed(2) : '0.00'

  return (
    <header className="flex items-center justify-between py-4 transition-colors duration-300">
      {/* Left side: Portfolio summary */}
      <div className="text-left">
        <div className="text-sm text-gray-500 dark:text-gray-400">Total Wealth</div>
        <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          €{totalWealth.toFixed(2)}
        </div>

        <div className="text-sm">
          <span
            className={
              totalProfit >= 0
                ? 'text-green-500 dark:text-green-400'
                : 'text-red-500 dark:text-red-400'
            }
          >
            {totalProfit >= 0 ? '+' : ''}€{totalProfit.toFixed(2)}
          </span>
          <span className="ml-2 text-gray-500 dark:text-gray-400">
            ({totalPercent >= 0 ? '+' : ''}{totalPercent}%)
          </span>
        </div>
      </div>

      {/* Center title */}
      <div className="text-center text-xl font-bold text-gray-900 dark:text-gray-100">
        Stock Portfolio
      </div>

    </header>
  )
}
