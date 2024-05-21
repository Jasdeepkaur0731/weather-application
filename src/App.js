import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { WiDaySunny, WiCloud, WiRain, WiWindy, WiSnow } from 'react-icons/wi';

function App() {
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    feelsLike: null,
    tempMin: null,
    tempMax: null,
    weatherStatus: null,
  });

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get('https://open-weather13.p.rapidapi.com/city/toronto/EN', {
          headers: {
            'X-RapidAPI-Key': 'c61942e7cbmsh9697cd1bbbc5744p1f9935jsn649d013f033d',
            'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com',
          },
        });
        const data = response.data.main;
        const weather = response.data.weather[0];
        const tempInCelsius = (temp) => ((temp - 32) * 5) / 9;

        setWeatherData({
          temperature: tempInCelsius(data.temp).toFixed(2),
          feelsLike: tempInCelsius(data.feels_like).toFixed(2),
          tempMin: tempInCelsius(data.temp_min).toFixed(2),
          tempMax: tempInCelsius(data.temp_max).toFixed(2),
          weatherStatus: weather.main,
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  const getWeatherIcon = (status) => {
    switch (status) {
      case 'Clear':
        return <WiDaySunny size={50} />;
      case 'Clouds':
        return <WiCloud size={50} />;
      case 'Rain':
        return <WiRain size={50} />;
      case 'Wind':
        return <WiWindy size={50} />;
      case 'Snow':
        return <WiSnow size={50} />;
      default:
        return <WiDaySunny size={50} />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Current Weather in Toronto</h1>
        {weatherData.temperature !== null ? (
          <div className="weather-info">
            <div className="info-box">
              <p>Temperature: {weatherData.temperature} °C</p>
            </div>
            <div className="info-box">
              <p>Feels Like: {weatherData.feelsLike} °C</p>
            </div>
            <div className="info-box">
              <p>Max Temperature: {weatherData.tempMax} °C</p>
            </div>
            <div className="info-box">
              <p>Min Temperature: {weatherData.tempMin} °C</p>
            </div>
            <div className="info-box">
              <p>
                Status: {weatherData.weatherStatus} {getWeatherIcon(weatherData.weatherStatus)}
              </p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
}

export default App;
