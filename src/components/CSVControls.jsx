import React from 'react'
import { downloadCSV, parseCSV } from '../utils/csv'

const STORAGE_KEY = 'stock_portfolio_v2'

export default function CSVControls({ stocks, setStocks }) {
  function handleExport() {
    downloadCSV('stock-portfolio-backup.csv', stocks)
  }

  function handleImport(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = parseCSV(reader.result)
        if (parsed.length === 0) {
          alert('No rows found in CSV')
          return
        }
        setStocks(prev => [...parsed, ...prev])
      } catch (err) {
        console.error(err)
        alert('Failed to parse CSV')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="mt-4 flex gap-2 transition-colors duration-300">
      <button
        onClick={handleExport}
        className="px-3 py-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
      >
        Export CSV
      </button>
      <label
        className="px-3 py-2 border rounded cursor-pointer bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
      >
        Import CSV
        <input
          onChange={handleImport}
          type="file"
          accept="text/csv"
          className="hidden"
        />
      </label>
    </div>
  )
}
