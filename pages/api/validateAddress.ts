import type { NextApiRequest } from 'next';

function getDistanceFromParis(lat: number, lon: number): number {
  const parisLat = 48.8566;
  const parisLon = 2.3522;
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Radius of Earth in km

  const dLat = toRad(lat - parisLat);
  const dLon = toRad(lon - parisLon);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(parisLat)) *
      Math.cos(toRad(lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

export default async function validateAddress(
  req: NextApiRequest,
): Promise<{ status: number; body: { error?: string; lat?: number; lon?: number; distance?: number } }> {
  const { address } = req.query;

  if (!address || typeof address !== 'string') {
    return {
      status: 400,
      body: { error: 'L\'adresse est requise' },
    };
  }

  try {
    const response = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(address)}&limit=1`
    );
    const data = await response.json();

    if (data.features.length === 0) {
      return {
        status: 404,
        body: { error: 'Adresse introuvable' },
      };
    }

    const { geometry } = data.features[0];
    const [lon, lat] = geometry.coordinates;

    const distance = getDistanceFromParis(lat, lon);

    if (distance > 50) {
      return {
        status: 400,
        body: {
          error: 'L\'adresse est située à plus de 50 km de Paris.',
          distance,
        },
      };
    }

    return {
      status: 200,
      body: { lat, lon, distance },
    };
  } catch (err) { // Changed from 'error' to 'err'
    console.error(err); // Log the error for debugging
    return {
      status: 500,
      body: { error: 'Erreur lors de la récupération des données d\'adresse' },
    };
  }
}
