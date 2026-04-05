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

  try {
    const response = await fetch(
      `https://proapis.hlgamingofficial.com/main/games/freefire/account/api?sectionName=AllData&PlayerUid=${uid}&region=${region.toLowerCase()}&useruid=V2hH1Huw2SRshpYmxSZEKfnyIxT2&api=ksHpnTN9fDP0SS9qST2tIH5oRUSvS2`
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Jugador no encontrado o región incorrecta' });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Error al consultar la API' });
  }
}
