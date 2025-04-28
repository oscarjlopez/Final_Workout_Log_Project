// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2025 Workout Tracker | All Rights Reserved</p>
    </footer>
  );
};

const styles = {
  footer: {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#2ecc71', // Match with workout green theme
    color: '#fff', // White text for better contrast
    position: 'fixed', // Keep footer at the bottom
    bottom: 0,
    width: '100%',
    fontSize: '1rem', // Adjust font size for footer text
    fontWeight: '600', // Slightly bold text for emphasis
    borderTop: '2px solid #34495e', // Add a top border to match the overall border style
  },
};

export default Footer;
