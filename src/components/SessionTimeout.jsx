
import React, { useState, useEffect } from 'react';

const SessionTimeout = ({ children, timeoutInMinutes = 10, onLogout }) => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let timer;

    const resetTimeout = () => {
      clearTimeout(timer);
      if (isActive) {
        timer = setTimeout(() => {
          // Trigger logout when the timeout occurs
          onLogout();
        }, timeoutInMinutes *60 * 1000);
      }
    };

    const handleActivity = () => {
      // Reset the timeout on user activity
      setIsActive(true);
      resetTimeout();
    };

    // Initial setup
    resetTimeout();

    // Event listeners for user activity
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    // Cleanup on component unmount
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, [isActive, onLogout, timeoutInMinutes]);

  return <>{children}</>;
};

export default SessionTimeout;