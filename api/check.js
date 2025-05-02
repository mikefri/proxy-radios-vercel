const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Servir le HTML
app.use(express.static(path.join(__dirname, '../public')));

// API proxy
app.get('/api/check', async (req, res) => {
  res.json({ status: "OK", message: "API check fonctionne" });
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
