// Lunch Roulette — Slack Slash Command Server
// Run: node server.js
// Requires: npm install express

const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

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
  'Bugers 🍔',
];

// ── Your hosted wheel URL ─────────────────────────────────────
// After deploying lunch-wheel.html to Netlify (or anywhere),
// paste the URL here:
const WHEEL_URL = 'resplendent-youtiao-30267c.netlify.app';

// ── Slash command handler ─────────────────────────────────────
app.post('/lunch', (req, res) => {
  const pick = LUNCH_OPTIONS[Math.floor(Math.random() * LUNCH_OPTIONS.length)];

  res.json({
    response_type: 'in_channel', // visible to whole channel
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `🎡 *The wheel has spoken!*\n\nToday's lunch: *${pick}*`,
        },
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: { type: 'plain_text', text: '🎡 Watch the spin', emoji: true },
            url: WHEEL_URL,
            style: 'primary',
          },
        ],
      },
    ],
  });
});

// Health check
app.get('/', (req, res) => res.send('Lunch Roulette server is running 🍴'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
