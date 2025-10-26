import React from 'react'

export default function StockList({ stocks, setStocks }) {
  function removeStock(id) {
    if (!confirm('Delete this stock?')) return
    setStocks(s => s.filter(x => x.id !== id))
  }

  if (stocks.length === 0)
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 mt-4 transition-colors duration-300">
        No stocks yet.
      </div>
    )

  return (
    <div className="mt-4 space-y-3 transition-colors duration-300">
      {stocks.map(s => (
        <div
          key={s.id}
          className="bg-white dark:bg-gray-800 p-3 rounded shadow flex justify-between transition-colors duration-300"
        >
          <div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">{s.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Cost: €{s.cost.toFixed(2)} | Fee: €{s.fee.toFixed(2)}
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Value: €{s.currentValue.toFixed(2)} | Prev: €{s.prevClose.toFixed(2)}
            </div>
          </div>
          <button
            onClick={() => removeStock(s.id)}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded hover:bg-red-100 dark:hover:bg-red-700 transition-colors duration-300"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}
