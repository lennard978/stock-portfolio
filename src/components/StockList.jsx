import React from 'react'


export default function StockList({ stocks, setStocks }) {
  function removeStock(id) {
    if (!confirm('Delete this stock?')) return
    setStocks(s => s.filter(x => x.id !== id))
  }


  if (stocks.length === 0) return <div className="text-center text-gray-500 mt-4">No stocks yet.</div>


  return (
    <div className="mt-4 space-y-3">
      {stocks.map(s => (
        <div key={s.id} className="bg-white dark:bg-gray-800 p-3 rounded shadow flex justify-between">
          <div>
            <div className="font-semibold">{s.name}</div>
            <div className="text-sm text-gray-500">Cost: €{s.cost.toFixed(2)} | Fee: €{s.fee.toFixed(2)}</div>
            <div className="text-sm">Value: €{s.currentValue.toFixed(2)} | Prev: €{s.prevClose.toFixed(2)}</div>
          </div>
          <button onClick={() => removeStock(s.id)} className="px-3 py-1 border rounded">Delete</button>
        </div>
      ))}
    </div>
  )
}