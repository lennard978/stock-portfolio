import React, { useState, useEffect } from 'react'
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">Total Wealth: €{totalWealth.toFixed(2)}</h2>
          <p className={`${dailyProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            Daily: €{dailyProfit.toFixed(2)} ({dailyPercent}%)
          </p>
        </div>
        <button onClick={() => setDarkMode(!darkMode)} className="px-3 py-1 border rounded">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>


      <h1 className="text-3xl font-bold text-center mb-6">Stock Portfolio</h1>


      <StockForm stocks={stocks} setStocks={setStocks} />
      <CSVControls stocks={stocks} setStocks={setStocks} />
      <StockList stocks={stocks} setStocks={setStocks} />
    </div>
  )
}