import React, { useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search-icon.png';
import mylogo from '../assets/mylogo.jpg';
import sunicon from '../assets/sunrise_sunset.jpeg'

const API_KEY = "0797c8a3def440b5929105127211511";

const Weather = () => {
  
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  /*const [showMessage, setShowMessage] = useState(false);*/
  const [latlondata, setLatLonData] = useState(false);

  const search = async (city) => {

    if (city === ""){
      alert("Enter City Name");
      return;
    }

    try {

      // Get Weather data based on API Key and City
      const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok){
        alert ("Not Found !!");
        return;
      }
      setWeatherData({
        City: data.location.name,
        Temperature: data.current.temp_c,
        Humidity: data.current.humidity,
        Condition: data.current.condition.icon,
        ConditionText: data.current.condition.text,
        WindSpeed: data.current.wind_kph,
        Time: data.location.localtime,
        Feels: data.current.feelslike_c,
        AQI: data.current.air_quality.o3,
        Country: data.location.country,
        Lattitude: data.location.lat,
        Longitude: data.location.lon
      })
      
      // Get Sunrise / Sunset timings based on lattitude and longitude
      const urllatlon=`https://api.sunrisesunset.io/json?lat=${data.location.lat}&lng=${data.location.lon}`;
      const responsel = await fetch(urllatlon);
      const datal = await responsel.json();

      setLatLonData({
        Sunrise: datal.results.sunrise,
        Sunset: datal.results.sunset
      })

    } catch (error) {
        setWeatherData(false);
        console.error("Error in fetching weather data !!")
    }

  }

  return (
    
    <div className='weather'>
        <div className='heading'>
          <img src={mylogo} alt='' className='myicon'/>
          <h2>My Weather App</h2>
        </div>
        <div className='search-bar'>
            <input ref= {inputRef} type='text' placeholder='Enter city name' />
            <img src = {search_icon} alt="search" onClick={()=>search(inputRef.current.value)} />
        </div>

        {weatherData?<> 
                 <img src={weatherData.Condition} alt='weather-icon' className='weathericon'/>
                 <p className='condition'>{weatherData.ConditionText}</p>
                 
                 <div className='weather-data'>
                  <div className='col'>
                    <p className='temperature'>{weatherData.Temperature}<span> °C</span></p>
                    <span className='temp'>Current Temperature</span>
                  </div>
                  <div className='col'>
                    <p className='feels'>{weatherData.Feels}<span> °C</span></p>
                    <span className='feels'>Feels Like</span>
                  </div>
                 </div>
                 <div className='weather-data'>
                   <div className='col'> 
                     <p className='city'>{weatherData.City}</p>
                     <span>City</span>
                   </div>
                   <div className='col'>
                     <p className='country'>{weatherData.Country}</p>
                     <span>Country</span>
                   </div>
                   <div className='col'>
                     <p className='time'>{weatherData.Time}</p>
                     <span>Local Time</span>
                   </div>
                 </div>                 
                 <div className='weather-data'>
                   <div className='col'>
                     <p className='humidity'>{weatherData.Humidity} %</p>
                     <span>Humidity</span>
                   </div>
                   <div className='col'>
                     <p className='windspeed'>{weatherData.WindSpeed} km/h</p>
                     <span>Wind Speed</span>
                   </div>
                   <div className='col'>
                     <p className='aqi'>{weatherData.AQI}</p>
                     <span>Air Quality</span>
                   </div>
                 </div>
                 <div className='weather-data'>
                   <div className='col'>
                     <p className='sunrise'>{latlondata.Sunrise}</p>
                     <span>Sunrise</span>
                   </div>
                   <div>
                     <img src={sunicon} alt='' className='icon'/>
                   </div>
                   <div className='col'>
                     <p className='sunset'>{latlondata.Sunset}</p>
                     <span>Sunset</span>
                   </div>
                 </div>      
        </>:<></>} 
 
    </div>
  )

} 

export default Weather;
