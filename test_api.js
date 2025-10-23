// Simple test script to exercise the API endpoints using global fetch (Node 18+)
(async () => {
  const base = process.env.API_BASE || 'http://127.0.0.1:5000/api'
  const tstamp = new Date().toISOString().replace(/[:.]/g, '-')
  const email = `test+${tstamp}@example.com`
  console.log('Using API base:', base)

  try {
    console.log('\n1) Health check:')
    const h = await (await fetch(`${base}/health`)).json()
    console.log(JSON.stringify(h))
  } catch (err) {
    console.error('Health check failed', err.message)
    process.exit(1)
  }

  let token = null
  try {
    console.log('\n2) Registering user:', email)
    const regRes = await fetch(`${base}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'AutoTest', email, password: 'password123' })
    })
    const reg = await regRes.json()
    console.log('Register response:', JSON.stringify(reg))
  } catch (err) {
    console.error('Register failed', err.message)
  }

  try {
    console.log('\n3) Logging in...')
    const loginRes = await fetch(`${base}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: 'password123' })
    })
    const login = await loginRes.json()
    console.log('Login response:', JSON.stringify(login))
    token = login.token
  } catch (err) {
    console.error('Login failed', err.message)
  }

  if (!token) {
    console.error('No token, aborting further tests')
    process.exit(1)
  }

  try {
    console.log('\n4) Fetch tasks (before create)')
    const tasksRes = await fetch(`${base}/tasks`, { headers: { Authorization: `Bearer ${token}` } })
    const tasks = await tasksRes.json()
    console.log('Tasks:', JSON.stringify(tasks))
  } catch (err) {
    console.error('Fetch tasks failed', err.message)
  }

  try {
    console.log('\n5) Create a sample task')
    const createRes = await fetch(`${base}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title: 'Scripted task', description: 'created by script', dueDate: new Date(Date.now()+3*24*3600*1000).toISOString() })
    })
    const created = await createRes.json()
    console.log('Create response:', JSON.stringify(created))
  } catch (err) {
    console.error('Create task failed', err.message)
  }

  try {
    console.log('\n6) Fetch tasks (after create)')
    const tasksRes2 = await fetch(`${base}/tasks`, { headers: { Authorization: `Bearer ${token}` } })
    const tasks2 = await tasksRes2.json()
    console.log('Tasks after:', JSON.stringify(tasks2))
  } catch (err) {
    console.error('Fetch tasks failed', err.message)
  }
})()
