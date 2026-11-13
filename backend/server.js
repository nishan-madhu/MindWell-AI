require('dotenv').config();
const path = require('path');
const express = require('express');
const chatRoute = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '20kb' }));
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  next();
});

app.use('/api/chat', chatRoute);
app.get('/api/health', (req, res) =>
  res.json({ ok: true, aiConfigured: Boolean(process.env.ANTHROPIC_API_KEY) })
);

app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.listen(PORT, () => {
  console.log(`MindWell AI running at http://localhost:${PORT}`);
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log('Note: ANTHROPIC_API_KEY not set. The chatbot will use built-in gentle replies.');
  }
});
