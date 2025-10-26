import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import StockForm from './components/StockForm'
import StockList from './components/StockList'
import CSVControls from './components/CSVControls'

const STORAGE_KEY = 'stock_portfolio_v2'

export default function App() {
  const [stocks, setStocks] = useState([])

  // Dark mode: read from localStorage or system preference on first load
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme')
      if (stored) return stored === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  // Apply dark mode class and persist theme
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  // Load saved stocks
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        const sanitized = parsed.map(s => ({
          ...s,
          cost: Number(s.cost) || 0,
          fee: Number(s.fee) || 0,
          currentValue: Number(s.currentValue) || 0,
          prevClose: Number(s.prevClose) || 0
        }))
        setStocks(sanitized)
      } catch (err) {
        console.error('Failed to parse saved stocks:', err)
        setStocks([])
      }
    }
  }, [])

  // Save stocks to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stocks))
  }, [stocks])

  // Safe toFixed helper
  const safeFixed = (n, digits = 2) => (typeof n === 'number' && !isNaN(n) ? n.toFixed(digits) : '0.00')

  // Calculate totals
  const totalWealth = stocks.reduce((sum, s) => sum + (Number(s.currentValue) || 0), 0)
  const totalCost = stocks.reduce((sum, s) => sum + ((Number(s.cost) || 0) + (Number(s.fee) || 0)), 0)
  const dailyProfit = stocks.reduce(
    (sum, s) => sum + ((Number(s.currentValue) || 0) - (Number(s.prevClose) || Number(s.currentValue) || 0)),
    0
  )
  const dailyPercent = totalCost ? ((dailyProfit / totalCost) * 100) : 0

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 transition-colors duration-300">
      {/* Header */}
      <Header totalWealth={totalWealth} dailyEuro={dailyProfit} dailyPercent={dailyPercent} />

      {/* Dark/Light Toggle */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>

      {/* Main App */}
      <StockForm setStocks={setStocks} />
      <CSVControls stocks={stocks} setStocks={setStocks} />
      <StockList stocks={stocks} setStocks={setStocks} />

      {/* Footer */}
      <Footer />
    </div>
  )
}
