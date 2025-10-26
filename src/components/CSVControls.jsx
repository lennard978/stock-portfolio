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
        if (parsed.length === 0) { alert('No rows found in CSV'); return }
        // merge conservatively: place imported rows before existing ones
        setStocks(prev => [...parsed, ...prev])
      } catch (err) {
        console.error(err)
        alert('Failed to parse CSV')
      }
    }
    reader.readAsText(file)
    // reset input so same file can be reselected later
    e.target.value = ''
  }


  return (
    <div className="mt-4 flex gap-2">
      <button onClick={handleExport} className="px-3 py-2 border rounded">Export CSV</button>
      <label className="px-3 py-2 border rounded cursor-pointer">
        Import CSV
        <input onChange={handleImport} type="file" accept="text/csv" className="hidden" />
      </label>
    </div>
  )
}