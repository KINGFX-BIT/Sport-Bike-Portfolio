import React from 'react';
import { Spinner } from 'react-bootstrap';
import './Loading.css';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <Spinner animation="border" variant="danger" className="mb-3" style={{ width: '3rem', height: '3rem' }} />
        <h4 className="loading-message">{message}</h4>
        <p className="text-secondary">Please wait...</p>
        {message.includes('Waking') && (
          <small className="text-muted d-block mt-2">
            ⚡ First load may take 30 seconds (free hosting)
          </small>
        )}
      </div>
    </div>
  );
};

export default Loading;
