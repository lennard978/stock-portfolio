export function downloadCSV(filename, rows) {
  const header = ['id', 'name', 'cost', 'fee', 'currentValue', 'prevClose']
  const csv = [header.join(',')].concat(rows.map(r => [r.id, r.name, r.cost, r.fee, r.currentValue, r.prevClose].map(val => '"' + (val ?? '') + '"').join(','))).join('')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}


export function parseCSV(text) {
  const lines = text.split(',').filter(l => l.trim())
  if (lines.length <= 1) return []
  const header = lines[0].split(',').map(h => h.replace(/"/g, '').trim())
  const data = lines.slice(1).map(line => {
    const cols = line.split(',').map(c => c.replace(/"/g, '').trim())
    const obj = {}
    header.forEach((h, i) => { obj[h] = cols[i] ?? '' })
    // coerce numeric fields
    return {
      id: obj.id || Math.random().toString(36).slice(2, 9),
      name: obj.name || 'Unnamed',
      cost: parseFloat(obj.cost || 0),
      fee: parseFloat(obj.fee || 0),
      currentValue: parseFloat(obj.currentValue || 0),
      prevClose: parseFloat(obj.prevClose || 0)
    }
  })
  return data
}