// components/UserProfileForm.tsx
import React, { useState } from "react";
// Remove the import of UpdateProfileForm.css here

const UpdateProfileForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    const response = await fetch("/api/updateUserProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        birthDate,
        address,
        phoneNumber,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error || "Une erreur est survenue lors de la mise à jour du profil.");
    } else {
      setMessage("Profil utilisateur mis à jour avec succès !");
    }
  };

  return (
    <div className="form-container">
      <h2>Mettre à jour le profil</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Prénom"
          required
        />
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Nom"
          required
        />
        <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Adresse"
          required
        />
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Numéro de téléphone"
          required
        />
        <button type="submit">Mettre à jour le profil</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default UpdateProfileForm;
