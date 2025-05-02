import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ ok: false, error: 'URL manquante' });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000); // Timeout de 7s

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Range': 'bytes=0-1',
        'User-Agent': 'Mozilla/5.0 (compatible; RadioChecker/1.0)'
      },
      redirect: 'follow',
      signal: controller.signal
    });

    clearTimeout(timeout);

    const contentType = response.headers.get('content-type') || '';
    const isAudio = contentType.startsWith('audio') || contentType.includes('mpeg') || contentType.includes('aac');

    return res.status(200).json({
      ok: response.ok && isAudio,
      status: response.status,
      contentType,
      finalUrl: response.url,
      isAudio
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.name === 'AbortError' ? 'Timeout dépassé (7s)' : error.message
    });
  }
}
