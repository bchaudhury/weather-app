import React from 'react';
import Weather from './components/Weather.jsx';
import Refresh from './components/AutoRefreshComponent.jsx';

const App = () => {
  return (
    <div className='app'>
      <Weather/>
      <Refresh/>
    </div>
  )
}

export default App;
