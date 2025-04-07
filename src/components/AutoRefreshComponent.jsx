import React, { useEffect } from 'react';
import './AutoRefreshComponent.css';

const AutoRefreshComponent = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 1200000); // Refresh every 1200 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='refresh'>
      {/* <p>The information will be displayed for 60 seconds</p> */}
    </div>
  );
};

export default AutoRefreshComponent;