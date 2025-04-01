import React, { useEffect } from 'react';
import './AutoRefreshComponent.css';

const AutoRefreshComponent = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 60000); // Refresh every 2 minutes

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='refresh'>
      <p>The information is available for 1 minute</p>
    </div>
  );
};

export default AutoRefreshComponent;