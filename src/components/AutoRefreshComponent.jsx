import React, { useEffect } from 'react';
import './AutoRefreshComponent.css';

const AutoRefreshComponent = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 30000); // Refresh every 30 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='refresh'>
      <p>The information is available for 30 seconds</p>
    </div>
  );
};

export default AutoRefreshComponent;