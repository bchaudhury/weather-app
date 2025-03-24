import React, { useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search-icon.png';
import my_icon from '../assets/Bhaskar.jpg';

const API_KEY = "0797c8a3def440b5929105127211511";

const Weather = () => {
  
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const search = async (city) => {

    if (city === ""){
      alert("Enter City Name");
      return;
    }

    try {
      const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok){
        alert ("Not Found !!");
        return;
      }
      setWeatherData({
        City: data.location.name,
        Temperature: Math.floor(data.current.temp_c),
        Humidity: data.current.humidity,
        Condition: data.current.condition.icon,
        ConditionText: data.current.condition.text,
        WindSpeed: data.current.wind_kph,
        Time: data.location.localtime,
        Feels: Math.floor(data.current.feelslike_c)
      })

    } catch (error) {
        setWeatherData(false);
        console.error("Error in fetching weather data !!")
    }

  }

  return (
    
    <div className='weather'>
        <div className='heading'>
          <img src={my_icon} alt=''className='myicon'/>
          <h2>My Weather App</h2>
          <h2>--------------------------</h2>
        </div>
        <div className='search-bar'>
            <input ref= {inputRef} type='text' placeholder='Enter city name' />
            <img src = {search_icon} alt="search" onClick={()=>search(inputRef.current.value)} onMouseEnter={() => {
          setShowMessage(true)}} onMouseLeave={() => {
            setShowMessage(false)}}/>
        </div>
        {showMessage && <h5 className='searchmessage'>Search</h5>}
        {weatherData?<> 
                 <img src={weatherData.Condition} alt='weather-icon' className='weathericon'/>
                 <p className='condition'>{weatherData.ConditionText}</p>
                 <p className='temperature'>{weatherData.Temperature}° C</p>
                 <p className='feels'>Feels like: {weatherData.Feels}° C</p>
                 <div className='weather-data'>
                   <div className='col'>
                     <p className='humidity'>{weatherData.Humidity}%</p>
                     <span>Humidity</span>
                   </div>
                   <div className='col'>
                     <p className='windspeed'>{weatherData.WindSpeed} km/h</p>
                     <span>Wind Speed</span>
                   </div>
                   <div className='col'>
                     <p className='time'>{weatherData.Time}</p>
                     <span>Local Time</span>
                   </div>
                 </div>      
        </>:<></>} 
 
    </div>
  )

} 

export default Weather;
