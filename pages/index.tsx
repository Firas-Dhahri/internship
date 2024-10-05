import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import UserProfileForm from '../components/UserProfileForm';

function Index() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      {user ? (
        <div>
          <h1>Bienvenue, {user.name}!</h1>
          <UserProfileForm /> {/* Intégrez le formulaire ici */}
        </div>
      ) : (
        <a href="/api/auth/login">Login</a>
      )}
    </div>
  );
}

export default Index;
