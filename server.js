// Lunch Roulette — Slack Slash Command Server
// Run: node server.js
// Requires: npm install express

const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ── Your lunch options ────────────────────────────────────────
// Edit this list to match your team's favourites!
const LUNCH_OPTIONS = [
  'Sushi 🍣',
  'Spicy Beef 🍜',
  'Subway',
  'Dumplings',
  'Doner',
  'Bahn mi',
  'Bakery',
  'Souvlaki',
  'Curry',
  'Curry & Beer',
  'Burgers 🍔',
  'Base Pizza',
  'Somewhere new',
];

// ── Your hosted wheel URL ─────────────────────────────────────
// After deploying lunch-wheel.html to Netlify (or anywhere),
// paste the URL here:
const WHEEL_URL = 'resplendent-youtiao-30267c.netlify.app';

// ── Slash command handler ─────────────────────────────────────
app.post('/lunch', (req, res) => {
  const pick = LUNCH_OPTIONS[Math.floor(Math.random() * LUNCH_OPTIONS.length)];

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    response_type: 'in_channel',
    text: `🎡 *The wheel has spoken!* Today's lunch: *${pick}* — Watch the spin: ${WHEEL_URL}`,
  }));
});

// Health check
app.get('/', (req, res) => res.send('Lunch Roulette server is running 🍴'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
