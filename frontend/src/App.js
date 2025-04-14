// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import { playerGameData } from './data/sample_data';
import './App.css';
import Roster from './pages/roster';
import RosterByPosition from './pages/RosterByPosition';
import Schedule from './components/Schedule/Schedule';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path='/roster' element={<RosterByPosition/>}/>
          <Route path='/calender' element={<Schedule/>}/>
          <Route path='/about' element={<About/>}/>

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App
