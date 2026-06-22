import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import emailRoutes from './routes/emailRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();
dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config({ path: path.join(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));

import fs from 'fs';

// Diagnostic logger endpoint
app.post('/api/debug-log', (req, res) => {
  try {
    const { message, html } = req.body;
    fs.writeFileSync(path.join(__dirname, '../debug_output.txt'), `=== DIAGNOSTIC LOG ===\nMessage: ${message}\n\nHTML Content:\n${html}\n`);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API Route Mounts
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/send-email', emailRoutes);
app.use('/api/contact', contactRoutes);

// Default status route
app.get('/', (req, res) => {
  res.json({ 
    status: "active", 
    message: "Vedic Numerology Backend Server is running successfully on port 5000." 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`[Server Ready] MERN express server listening on http://localhost:${PORT}`);
});
