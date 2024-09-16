import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import './MapView.css'; 

const MapView = () => {
  const [position, setPosition] = useState([13.1067, 80.0970]); 
  const [destination, setDestination] = useState([13.1067, 80.0970]);
  const [route, setRoute] = useState([]);
  const [hasLocation, setHasLocation] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const newPosition = [position.coords.latitude, position.coords.longitude];
          console.log('Updated Position:', newPosition); 
          setPosition(newPosition);
          setHasLocation(true);
          fetchRoute(newPosition, destination);
        },
        (error) => {
          console.error('Geolocation Error:', error);
          setHasLocation(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setHasLocation(false);
    }
  }, [destination]);

  const fetchRoute = async (start, end) => {
    const apiKey = '5b3ce3597851110001cf6248575bec70717f4924bd7c05478652e78b'; 
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start[1]},${start[0]}&end=${end[1]},${end[0]}`;

    try {
      const response = await axios.get(url);
      const coordinates = response.data.features[0].geometry.coordinates;
      const routeCoordinates = coordinates.map(coord => [coord[1], coord[0]]);
      setRoute(routeCoordinates);
    } catch (error) {
      console.error('Error fetching the route:', error);
    }
  };

  const truckIcon = new L.Icon({
    iconUrl: 'https://cdn.pixabay.com/photo/2014/04/02/16/18/truck-306852_1280.png', // Replace with your truck icon URL
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
  });

  return (
    <MapContainer center={position} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {hasLocation && (
        <Marker position={position} icon={truckIcon}>
          <Popup>
            Current Location: {position[0].toFixed(4)}, {position[1].toFixed(4)}
          </Popup>
        </Marker>
      )}
      <Marker position={destination}>
        <Popup>
          Destination: {destination[0].toFixed(4)}, {destination[1].toFixed(4)}
        </Popup>
      </Marker>
      {route.length > 0 && (
        <Polyline positions={route} color="blue" />
      )}
    </MapContainer>
  );
};

export default MapView;
