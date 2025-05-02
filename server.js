const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Simple radio proxy tester
app.get("/api/check", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "URL manquante" });

  try {
    const response = await fetch(url, { method: "HEAD", timeout: 5000 });
    res.json({ status: response.status, ok: response.ok });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fallback
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => console.log(`Serveur sur http://localhost:${PORT}`));
