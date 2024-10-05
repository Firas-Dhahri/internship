import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import UserProfileForm from '../components/UserProfileForm';
import Link from 'next/link';

const linkStyle = {
  display: 'inline-block',
  padding: '10px 20px',
  backgroundColor: '#0070f3',
  color: '#fff',
  borderRadius: '5px',
  textDecoration: 'none',
  transition: 'background-color 0.3s ease',
};

function Index() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      {user ? (
        <div>
          <h1>Bienvenue, {user.name}!</h1>
          <UserProfileForm />
        </div>
      ) : (
        <Link href="/api/auth/login/" style={linkStyle}>
          Login
        </Link>
      )}
    </div>
  );
}

export default Index;
