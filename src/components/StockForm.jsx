import React, { useState } from "react";

export default function StockForm({ setStocks }) {
  const [name, setName] = useState("");
  const [investment, setInvestment] = useState("");
  const [fee, setFee] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");

  // Derived values
  const investedInStock = investment && fee ? investment - fee : 0;
  const shares = buyPrice ? investedInStock / buyPrice : 0;
  const currentValue = currentPrice ? shares * currentPrice : 0;
  const profitLoss = currentValue - investment;
  const percentageChange =
    investment > 0 ? ((profitLoss / investment) * 100).toFixed(2) : 0;

  // Add stock to portfolio
  const handleAddStock = (e) => {
    e.preventDefault();
    if (!name || !investment || !buyPrice || !currentPrice) {
      alert("Please fill all fields");
      return;
    }

    const newStock = {
      id: Date.now(),
      name,
      cost: Number(investment) - Number(fee || 0),
      fee: Number(fee) || 0,
      buyPrice: Number(buyPrice),
      currentPrice: Number(currentPrice),
      currentValue: Number(currentValue),
      shares: Number(shares),
      profitLoss: Number(profitLoss),
      percent: Number(percentageChange),
      prevClose: Number(currentPrice),
    };

    setStocks((prev) => [...prev, newStock]);

    // Reset fields
    setName("");
    setInvestment("");
    setFee("");
    setBuyPrice("");
    setCurrentPrice("");
  };

  return (
    <form
      onSubmit={handleAddStock}
      className="max-w-md mx-auto p-4 pt-0 mt-0 rounded-2xl shadow-lg bg-gray-900"
    >
      <h2 className="text-xl font-bold mb-4 text-center">📈 Stock Calculator</h2>

      <div className="space-y-3">
        <label className="block">
          <span className="text-sm">Stock Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Apple (AAPL)"
            className="w-full p-2 border rounded-lg bg-gray-800"
          />
        </label>

        <label className="block">
          <span className="text-sm">Total Investment (€)</span>
          <input
            type="number"
            value={investment}
            onChange={(e) => setInvestment(parseFloat(e.target.value) || "")}
            className="w-full p-2 border rounded-lg bg-gray-800"
          />
        </label>

        <label className="block">
          <span className="text-sm">Fee (€)</span>
          <input
            type="number"
            value={fee}
            onChange={(e) => setFee(parseFloat(e.target.value) || "")}
            className="w-full p-2 border rounded-lg bg-gray-800"
          />
        </label>

        <label className="block">
          <span className="text-sm">Buy Price (€)</span>
          <input
            type="number"
            value={buyPrice}
            onChange={(e) => setBuyPrice(parseFloat(e.target.value) || "")}
            className="w-full p-2 border rounded-lg bg-gray-800"
          />
        </label>

        <label className="block">
          <span className="text-sm">Current Price (€)</span>
          <input
            type="number"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(parseFloat(e.target.value) || "")}
            className="w-full p-2 border rounded-lg bg-gray-800"
          />
        </label>
      </div>

      {/* Results */}
      <div className="mt-6 text-center space-y-1">
        <p>Shares Owned: <strong>{shares.toFixed(4)}</strong></p>
        <p>Current Value: <strong>{currentValue.toFixed(2)} €</strong></p>
        <p>
          Profit / Loss:{" "}
          <strong className={profitLoss >= 0 ? "text-green-600" : "text-red-600"}>
            {profitLoss.toFixed(2)} € ({percentageChange}%)
          </strong>
        </p>
      </div>

      <button
        type="submit"
        className="mt-6 w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
      >
        ➕ Add Stock
      </button>
    </form>
  );
}
