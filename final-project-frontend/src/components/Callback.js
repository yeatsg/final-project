// src/pages/Callback.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Callback = () => {
  const [callbackError, setCallbackError] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const handleCallback = async () => {
      try {
        const response = await fetch('/api/auth/exchange', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code, state }),
        });

        if (!response.ok) {
          throw new Error('Failed to exchange code for tokens');
        }

        const data = await response.json();
        
      } catch (err) {
        setLoading(false);
      }
    };

    handleCallback();
  }, [location, navigate]);

  if (loading) {
    return (
        <div>
        Processing authorization...
      </div>
    );
  }

  if (error) {
    return (
        <div>

            <h2>Authorization Failed</h2>
        </div>
    );
  }

  return null;
};

export default Callback;