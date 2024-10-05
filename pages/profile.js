import { useUser } from '@auth0/nextjs-auth0';
import { useState, useEffect } from 'react';

export default function Profile() {
  const { user, isLoading } = useUser();
  const [profileData, setProfileData] = useState({
    name: '',
    lastName: '',
    dateOfBirth: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.given_name || '',
        lastName: user.family_name || '',
        dateOfBirth: '', // User needs to add this manually
        address: '', // User needs to add this manually
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission to update user data
    console.log('Profile data:', profileData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Please log in</div>;

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={profileData.name}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={profileData.lastName}
            onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
          />
        </label>
        <br />
        <label>
          Date of Birth:
          <input
            type="date"
            value={profileData.dateOfBirth}
            onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            value={profileData.address}
            onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
          />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="tel"
            value={profileData.phone}
            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
          />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
