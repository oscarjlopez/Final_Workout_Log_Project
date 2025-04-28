// components/LogoutButton.jsx
import React from 'react';
import { useAuthContext } from '@asgardeo/auth-react';

const LogoutButton = () => {
  const { signOut } = useAuthContext();

  const handleLogout = () => {
    signOut(); // Automatically redirects to your signOutRedirectURL
  };

  return (
    <button onClick={handleLogout} style={{
      padding: '0.5rem 1rem',
      backgroundColor: '#e74c3c',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer'
    }}>
      Logout
    </button>
  );
};

export default LogoutButton;
