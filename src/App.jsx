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
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 transition-colors duration-300">
      {/* Header */}
      <button id="theme-toggle" type="button" class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
        <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
        <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
      </button>
      <Header
        totalWealth={totalWealth}
        totalCost={totalCost}
        totalProfit={totalProfit}
        totalDeposit={stocks.reduce((sum, s) => sum + (Number(s.cost) || 0), 0)}
        totalFees={stocks.reduce((sum, s) => sum + (Number(s.fee) || 0), 0)}
      />

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
