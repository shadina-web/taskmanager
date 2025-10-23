const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

// Allow CORS from frontend (Vite default port) and any configured origin
const allowOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: allowOrigin }));
app.use(express.json());

// Connect DB
connectDB();

// Health
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));
// Debug / seed route (only in non-production)
if (process.env.NODE_ENV !== 'production') {
	app.use('/api/debug', require('./routes/seed'));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
