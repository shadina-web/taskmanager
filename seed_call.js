(async ()=>{
  const bases = ['http://127.0.0.1:5000/api', 'http://localhost:5000/api']
  for (const base of bases) {
    try {
      console.log('Trying', base)
      const res = await fetch(`${base}/debug/seed`, { method: 'POST' })
      const text = await res.text()
      try { console.log('Response JSON:', JSON.stringify(JSON.parse(text), null, 2)) } catch { console.log('Response text:', text) }
      return
    } catch (err) {
      console.error(`Request to ${base} failed:`, err && err.message ? err.message : err)
    }
  }
  console.error('All attempts failed')
  process.exit(1)
})()
