import React from 'react';

const MotivationalQuote = ({ quote }) => {
  return quote ? (
    <div style={styles.quoteContainer}>
      <p>{quote}</p>
    </div>
  ) : null;
};

const styles = {
  quoteContainer: {
    margin: '20px 0',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontStyle: 'italic',
    color: '#333',
  }
};

export default MotivationalQuote;
