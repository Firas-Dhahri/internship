import { useState } from 'react';

interface AddressData {
  lat: number;
  lon: number;
  distance: number;
}

export default function AddressForm() {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [addressData, setAddressData] = useState<AddressData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      const response = await fetch(
        `/api/validateAddress?address=${encodeURIComponent(address)}`
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to validate address.'); // Set error message
        return;
      }

      setAddressData(data);
    } catch (err) {
      // Handle unexpected errors
      setError('An unexpected error occurred');
      console.error(err); // Optional: log error for debugging
    }
  };

  return (
    <div>
      <h2>Enter Your Address</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required // Make it a required field
          />
        </label>
        <br />
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
        {addressData && (
          <p>
            Address is within 50 km of Paris. Distance: {addressData.distance} km.
          </p>
        )}
        <button type="submit">Validate</button>
      </form>
    </div>
  );
}
