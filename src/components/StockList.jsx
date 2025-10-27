import React, { useState } from 'react'

export default function StockList({ stocks, setStocks }) {
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})

  function removeStock(id) {
    if (!confirm('Delete this stock?')) return
    setStocks(s => s.filter(x => x.id !== id))
  }

  function startEdit(stock) {
    setEditingId(stock.id)
    setEditData({ ...stock })
  }

  function cancelEdit() {
    setEditingId(null)
    setEditData({})
  }

  function saveEdit() {
    setStocks(prev =>
      prev.map(s =>
        s.id === editingId
          ? {
            ...editData,
            buyPrice: Number(editData.buyPrice),
            currentPrice: Number(editData.currentPrice),
            shares: Number(editData.shares),
            fee: Number(editData.fee),
            cost: Number(editData.buyPrice) * Number(editData.shares),
            currentValue: Number(editData.currentPrice) * Number(editData.shares),
          }
          : s
      )
    )
    setEditingId(null)
  }

  if (stocks.length === 0)
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 mt-4 transition-colors duration-300">
        No stocks yet.
      </div>
    )

  return (
    <div className="mt-4 space-y-3 transition-colors duration-300">
      {stocks.map(s => {
        const profit = s.currentValue - (s.cost + s.fee)
        const profitPercent = ((profit / (s.cost + s.fee)) * 100).toFixed(2)

        return (
          <div
            key={s.id}
            className="bg-white dark:bg-gray-800 p-3 rounded shadow flex flex-col sm:flex-row sm:justify-between sm:items-center transition-colors duration-300"
          >
            {editingId === s.id ? (
              // Edit mode form
              <div className="flex-1 space-y-2">
                <input
                  className="w-full p-1 border rounded dark:bg-gray-700 dark:text-gray-100"
                  value={editData.name}
                  onChange={e => setEditData({ ...editData, name: e.target.value })}
                  placeholder="Stock name"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    className="w-1/4 p-1 border rounded dark:bg-gray-700 dark:text-gray-100"
                    value={editData.buyPrice}
                    onChange={e => setEditData({ ...editData, buyPrice: e.target.value })}
                    placeholder="Buy €"
                  />
                  <input
                    type="number"
                    className="w-1/4 p-1 border rounded dark:bg-gray-700 dark:text-gray-100"
                    value={editData.currentPrice}
                    onChange={e => setEditData({ ...editData, currentPrice: e.target.value })}
                    placeholder="Now €"
                  />
                  <input
                    type="number"
                    className="w-1/4 p-1 border rounded dark:bg-gray-700 dark:text-gray-100"
                    value={editData.shares}
                    onChange={e => setEditData({ ...editData, shares: e.target.value })}
                    placeholder="Shares"
                  />
                  <input
                    type="number"
                    className="w-1/4 p-1 border rounded dark:bg-gray-700 dark:text-gray-100"
                    value={editData.fee}
                    onChange={e => setEditData({ ...editData, fee: e.target.value })}
                    placeholder="Fee €"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={saveEdit}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // Normal display mode
              <>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    {s.name}
                  </div>

                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Bought at: €{s.buyPrice.toFixed(2)} | Current: €{s.currentPrice.toFixed(2)}
                  </div>

                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Shares: {s.shares} | Fee: €{s.fee.toFixed(2)}
                  </div>

                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    Cost: €{(s.cost + s.fee).toFixed(2)} | Value: €{s.currentValue.toFixed(2)}
                  </div>

                  <div
                    className={`text-sm font-medium ${profit >= 0
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                      }`}
                  >
                    Profit/Loss: €{profit.toFixed(2)} ({profitPercent}%)
                  </div>
                </div>

                <div className="flex gap-2 mt-3 sm:mt-0 sm:ml-4">
                  <button
                    onClick={() => startEdit(s)}
                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded hover:bg-blue-100 dark:hover:bg-blue-700 transition-colors duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeStock(s.id)}
                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded hover:bg-red-100 dark:hover:bg-red-700 transition-colors duration-300"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}
