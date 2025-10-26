import React from 'react'
import ThemeToggle from './ThemeToggle'

export default function Header({ totalWealth, dailyEuro, dailyPercent }) {
  return (
    <header className="flex items-center justify-between py-4 transition-colors duration-300">
      <div className="text-left">
        <div className="text-sm text-gray-500 dark:text-gray-400">Total Wealth</div>
        <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">€{totalWealth.toFixed(2)}</div>
        <div className="text-sm">
          <span className={dailyEuro >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}>
            {dailyEuro >= 0 ? '+' : ''}€{dailyEuro.toFixed(2)}
          </span>
          <span className="ml-2 text-gray-500 dark:text-gray-400">
            ({dailyPercent >= 0 ? '+' : ''}{dailyPercent.toFixed(2)}%)
          </span>
        </div>
      </div>

      <div className="text-center text-xl font-bold text-gray-900 dark:text-gray-100">
        Stock Portfolio
      </div>

      <ThemeToggle />
    </header>
  )
}
