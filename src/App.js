import React from 'react';
import Main from './components/Main';
import { FaFacebookSquare, FaTwitterSquare } from 'react-icons/fa';
import './App.css';

function App() {
  return (
    <div className='app'>
      <div className='header'>
        <h1>Turist</h1>
        <div className='icons'>
          <span><FaFacebookSquare/></span>
          <span><FaTwitterSquare/></span>
        </div>
      </div>
      <div className='section'>
        <Main/>
      </div>
      <div className='footer'>
        © 2022 Turist, All rights reserved
      </div>
    </div>
  );
}

export default App;
