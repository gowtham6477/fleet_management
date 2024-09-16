import React from 'react';
import Dashboard from './components/Dashboard.js';
import './App.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';


function App() {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
