import React, { useEffect } from 'react';
import './AutoRefreshComponent.css';

const AutoRefreshComponent = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 60000); // Refresh every 30 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='refresh'>
      <p>The information is available for 60 seconds</p>
    </div>
  );
};

export default AutoRefreshComponent;