import type { NextApiRequest, NextApiResponse } from 'next';
import validateAddress from './validateAddress'; // Assurez-vous d'importer votre méthode de validation

interface UpdateUserProfileResponse {
  status: number;
  body: {
    error?: string;
    message?: string;
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, birthDate, address, phoneNumber } = req.body;

  // Validation des champs requis
  if (!firstName || !lastName || !birthDate || !address || !phoneNumber) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  // Validation de l'adresse
  const addressValidationResponse = await validateAddress({ query: { address } } as unknown as NextApiRequest, res);

  // Vérifiez si la réponse de validation d'adresse contient une erreur
  if (addressValidationResponse.status !== 200) {
    return res.status(addressValidationResponse.status).json(addressValidationResponse.body);
  }

  // Si tout est valide, mettez à jour le profil utilisateur
  // Ici, vous devriez appeler votre base de données ou un service pour mettre à jour le profil

  // Exemple de mise à jour fictive
  // const updatedUserProfile = await updateUserProfileInDatabase({ firstName, lastName, birthDate, address, phoneNumber });

  return res.status(200).json({ message: 'Profil utilisateur mis à jour avec succès !' });
}
