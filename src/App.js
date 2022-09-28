import React from 'react';
import Main from './components/Main';
import logo from './styles/images/logo.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='header'>
      <img src={logo} alt='/'/>
      <h1>Turist</h1>
      </div>
      <div className='section'>
        <Main/>
      </div>
      <div className='footer'>
        © 2022 Turist, Wszystkie prawa zastrzeżone
      </div>
    </div>
  );
}

export default App;
