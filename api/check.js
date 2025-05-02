const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL manquante' });
  }

  try {
    const response = await fetch(url, { method: 'HEAD', timeout: 5000 });
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({
      status: response.status,
      ok: response.ok,
      contentType: response.headers.get('content-type') || ''
    });
  } catch (error) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({ error: error.message });
  }
};
