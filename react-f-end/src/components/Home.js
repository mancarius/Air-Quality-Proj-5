import React, { useState } from 'react';
import AirQualityCard from './AirQualityCard';
import AirQualityLevelsTable from './AirQualityLevelsTable';
import CitySearch from './CitySearch';
import PollutantInfo from './PollutantInfo';

function Home() {

  const [airQualityData, setAirQualityData] = useState(null);
  const [error, setError] = useState(null);

  const getAirQuality = async (city) => {
    try {
      const response = await fetch(`https://api.waqi.info/feed/${city}/?token=b49bc52070932d341a0dd2ceb5e450aa9269358c`)
      const data = await response.json()
      console.log(data)
      if(response.ok && data.status === 'ok') {
        setAirQualityData(data.data)
        setError(null)
      } else {
        setError("Sorry, we couldn't find the city you were looking for. Try another location nearby or ensure your spelling is correct.")
        setAirQualityData(null)
      }
    } catch (error) {
      console.error("network error:", error)
      setError('Sorry, something went wrong')
      setAirQualityData(null)
    }
  }

  const addFavoriteCity = async (city_name) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:3000/auth/add-favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({ city_name }),
      });
  
      if (response.ok) {
        console.log('Città Aggiunta');
      } else {
        console.log('Errore, Città non Aggiunta');
        console.log(city_name);
      }
    } catch (error) {
      console.error('Si è verificato un errore durante l\'aggiunta della città preferita:', error);
    }
  };
  




  return (
    <div className='container'>
      <div className='items-center'>

      <div className='login-form'>
      </div>

    <h1 className='mt-5-mb-3'>🌍 Air Quality Index Checker</h1>
    <CitySearch getAirQuality={getAirQuality}/>
    {error && (
      <div className='alert-danger' role='alert'>
        {error}
      </div>
    )}

    <div className='result-container'>
    {airQualityData && (
      <div className='info-levels'>
      <>
      <AirQualityCard data={airQualityData} />
      <PollutantInfo pollutant={airQualityData.dominentpol}/>
      </>
      </div>
    )}

    <AirQualityLevelsTable />

    <button onClick={() => addFavoriteCity(airQualityData.city.name)}>Aggiungi Città Preferita</button>

    </div>
    </div>

    </div>

  );
}

export default Home;
