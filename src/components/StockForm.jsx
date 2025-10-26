import React, { useState } from 'react'


function uid() { return Math.random().toString(36).slice(2, 9) }


export default function StockForm({ setStocks }) {
  const [form, setForm] = useState({ name: '', cost: '', fee: '', currentValue: '', prevClose: '' })


  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }


  function addStock() {
    const payload = {
      id: uid(),
      name: form.name || 'Unnamed',
      cost: parseFloat(form.cost || 0),
      fee: parseFloat(form.fee || 0),
      currentValue: parseFloat(form.currentValue || 0),
      prevClose: parseFloat(form.prevClose || 0)
    }
    setStocks(s => [payload, ...s])
    setForm({ name: '', cost: '', fee: '', currentValue: '', prevClose: '' })
  }


  return (
    <section className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Add Stock</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="p-2 border rounded col-span-2 dark:bg-gray-900" />
        <input name="cost" value={form.cost} onChange={handleChange} placeholder="Cost (€)" className="p-2 border rounded" />
        <input name="fee" value={form.fee} onChange={handleChange} placeholder="Fee (€)" className="p-2 border rounded" />
        <input name="currentValue" value={form.currentValue} onChange={handleChange} placeholder="Current Value (€)" className="p-2 border rounded" />
        <input name="prevClose" value={form.prevClose} onChange={handleChange} placeholder="Prev Close (€)" className="p-2 border rounded" />
      </div>
      <div className="mt-3">
        <button onClick={addStock} className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
      </div>
    </section>
  )
}