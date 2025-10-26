export function downloadCSV(filename, data) {
  const rows = data.map(s => [s.name, s.cost, s.fee, s.currentValue, s.prevClose])
  const csvContent = 'Name,Cost,Fee,CurrentValue,PrevClose\n' +
    rows.map(r => r.join(',')).join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
}

export function parseCSV(content) {
  const lines = content.trim().split('\n')
  const [header, ...rows] = lines
  return rows.map(line => {
    const [name, cost, fee, currentValue, prevClose] = line.split(',')
    return { id: Math.random().toString(36).slice(2, 9), name, cost: parseFloat(cost), fee: parseFloat(fee), currentValue: parseFloat(currentValue), prevClose: parseFloat(prevClose) }
  })
}
