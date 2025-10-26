import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import StockForm from './components/StockForm'
import StockList from './components/StockList'
import CSVControls from './components/CSVControls'

const STORAGE_KEY = 'stock_portfolio_v2'

export default function App() {
  const [stocks, setStocks] = useState([])
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) setStocks(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stocks))
  }, [stocks])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const totalWealth = stocks.reduce((sum, s) => sum + s.currentValue, 0)
  const totalCost = stocks.reduce((sum, s) => sum + s.cost + s.fee, 0)
  const dailyProfit = stocks.reduce((sum, s) => sum + ((s.currentValue - (s.prevClose || s.currentValue))), 0)
  const dailyPercent = totalCost ? ((dailyProfit / totalCost) * 100).toFixed(2) : 0

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 transition-colors duration-300">
      <Header totalWealth={totalWealth} dailyEuro={dailyProfit} dailyPercent={dailyPercent} />
      <StockForm setStocks={setStocks} />
      <CSVControls stocks={stocks} setStocks={setStocks} />
      <StockList stocks={stocks} setStocks={setStocks} />
      <Footer />
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-2 border rounded transition-colors duration-300 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          {darkMode ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </div>
  )
}
