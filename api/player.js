export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { uid, region } = req.query;

  if (!uid || !region) {
    return res.status(400).json({ error: 'Faltan parámetros uid o region' });
  }

  const validRegions = ['IND', 'BR', 'SG', 'RU', 'ID', 'TW', 'US', 'VN', 'TH', 'ME', 'PK', 'CIS', 'BD'];
  if (!validRegions.includes(region.toUpperCase())) {
    return res.status(400).json({ error: `Región no válida. Usa: ${validRegions.join(', ')}` });
  }

  try {
    const response = await fetch(
      `https://free-ff-api-src-5plp.onrender.com/api/v1/account?region=${region.toUpperCase()}&uid=${uid}`
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Jugador no encontrado o región incorrecta' });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Error al consultar la API de Free Fire' });
  }
}
