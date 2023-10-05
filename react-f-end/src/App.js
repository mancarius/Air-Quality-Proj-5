import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa anche Routes
import { Link } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/Home';

function App() {

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
      const response = await fetch('http://localhost:3000/auth/add-favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city_name }),
      });
  
      if (response.ok) {
        console.log('Città Aggiunta');
      } else {
        console.log('Errore, Città non Aggiunta');
      }
    } catch (error) {
      console.error('Si è verificato un errore durante l\'aggiunta della città preferita:', error);
    }
  };
  




  return (
<Router>
    <div className='container'>
      <header className='header-login'>
        <Link to='/' className='nav-text'>Home</Link> {/* Utilizza Link per creare il link */}
        <Link to='/login' className='nav-text'>Login</Link> {/* Utilizza Link per creare il link */}
        <Link to='/signup' className='nav-text'>Signup</Link> {/* Utilizza Link per creare il link */}
      </header>

        <Routes>
          <Route path='/' element={<Home />} /> 
          <Route path='/login' element={<Login />} /> 
          <Route path='/signup' element={<Signup />} /> 
        </Routes>
    </div>
  </Router>
  );
}

export default App;
