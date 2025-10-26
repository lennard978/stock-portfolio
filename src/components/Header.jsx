import React, { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle'


export default function Header({ totalWealth, dailyEuro, dailyPercent }) {
  return (
    <header className="flex items-center justify-between py-4">
      <div className="text-left">
        <div className="text-sm text-gray-500 dark:text-gray-400">Total Wealth</div>
        <div className="text-2xl font-semibold">€{totalWealth.toFixed(2)}</div>
        <div className="text-sm">
          <span className={dailyEuro >= 0 ? 'text-green-500' : 'text-red-400'}>
            {dailyEuro >= 0 ? '+' : ''}€{dailyEuro.toFixed(2)}
          </span>
          <span className="ml-2 text-gray-500">({dailyPercent >= 0 ? '+' : ''}{dailyPercent.toFixed(2)}%)</span>
        </div>
      </div>
      <div className="text-center text-xl font-bold">Stock Portfolio</div>
      <ThemeToggle />
    </header>
  )
}