import React from 'react';
import { useAuthContext } from '@asgardeo/auth-react';

const Home = () => {
  const { signIn } = useAuthContext();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to FitTrack</h1>
      <p style={styles.subtitle}>Your personal workout log starts here.</p>
      <button style={styles.button} onClick={() => signIn()}>
        Login with Asgardeo
      </button>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontFamily: 'Segoe UI, sans-serif',
    textAlign: 'center',
    padding: '0 20px'
  },
  title: {
    fontSize: '3rem',
    marginBottom: '1rem'
  },
  subtitle: {
    fontSize: '1.25rem',
    marginBottom: '2rem'
  },
  button: {
    backgroundColor: '#00d084',
    border: 'none',
    padding: '12px 24px',
    fontSize: '1rem',
    color: '#fff',
    cursor: 'pointer',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
    transition: 'background-color 0.3s ease'
  }
};

export default Home;
