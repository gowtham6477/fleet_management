import React, { useState, useEffect } from 'react';
import './Dashboard.css';  
import MapView from './MapView.js';  

function Dashboard() {
  const [liveTrucksCount, setLiveTrucksCount] = useState(() => {
    const savedCount = localStorage.getItem('liveTrucksCount');
    return savedCount !== null ? parseInt(savedCount, 10) : 0;
  });

  const [staticTrucksCount, setStaticTrucksCount] = useState(() => {
    const savedCount = localStorage.getItem('staticTrucksCount');
    return savedCount !== null ? parseInt(savedCount, 10) : 0;
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        const newLiveTrucksCount = liveTrucksCount + 1;
        const newStaticTrucksCount = staticTrucksCount + 1;

        setLiveTrucksCount(newLiveTrucksCount);
        setStaticTrucksCount(newStaticTrucksCount);

        localStorage.setItem('liveTrucksCount', newLiveTrucksCount);
        localStorage.setItem('staticTrucksCount', newStaticTrucksCount);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [liveTrucksCount, staticTrucksCount]);

  return (
    <div className="dashboard">
      <header>
        <h1>RTN Truck Tracking Dashboard</h1>
      </header>

      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#tracking">Live Tracking</a></li>
          <li><a href="#settings">Settings</a></li>
        </ul>
      </nav>

      <main>
        <section id="tracking">
          <h2>Live Truck Locations</h2>
          <div className="map-container">
            <MapView />
          </div>
        </section>

        <section id="truck-counts" className="truck-counts-row">
          <div className="truck-count-item">
            <h2>Live Trucks</h2>
            <div className="truck-count">
              <p>{liveTrucksCount}</p>
            </div>
          </div>

          <div className="truck-count-item">
            <h2>Static Trucks</h2>
            <div className="truck-count">
              <p>{staticTrucksCount}</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Department of Posts. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Dashboard;
