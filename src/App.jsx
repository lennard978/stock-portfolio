import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import StockForm from './components/StockForm'
import StockList from './components/StockList'
import CSVControls from './components/CSVControls'

const STORAGE_KEY = 'stock_portfolio_v3'

export default function App() {
  const [stocks, setStocks] = useState([])

  // 🧠 Load saved stocks from localStorage
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
          buyPrice: Number(s.buyPrice) || 0,
          currentPrice: Number(s.currentPrice) || 0,
          shares: Number(s.shares) || 0,
        }))
        setStocks(sanitized)
      } catch (err) {
        console.error('Failed to parse saved stocks:', err)
        setStocks([])
      }
    }
  }, [])

  // 💾 Auto-save to localStorage on any change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stocks))
  }, [stocks])

  // 🧮 Calculations
  const totalWealth = stocks.reduce((sum, s) => sum + (Number(s.currentValue) || 0), 0)
  const totalCost = stocks.reduce((sum, s) => sum + ((Number(s.cost) || 0) + (Number(s.fee) || 0)), 0)
  const totalProfit = totalWealth - totalCost

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 transition-colors duration-300">
      {/* Header */}
      <Header totalWealth={totalWealth} totalCost={totalCost} totalProfit={totalProfit} />


      {/* Calculator form for adding new stock */}
      <StockForm setStocks={setStocks} />

      {/* CSV controls */}
      <CSVControls stocks={stocks} setStocks={setStocks} />

      {/* List of saved stocks (with Edit & Delete) */}
      <StockList stocks={stocks} setStocks={setStocks} />

      {/* Footer */}
      <Footer />
    </div>
  )
}
