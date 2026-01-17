import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Job } from '../molecules/JobCard';
import L from 'leaflet';

// Create custom icons using DivIcon for more control via CSS/HTML
const createJobIcon = (price: number) => L.divIcon({
  className: 'custom-job-marker',
  html: `
    <div style="
      background-color: white;
      padding: 4px 8px;
      border-radius: 12px;
      border: 2px solid #16a34a;
      font-weight: bold;
      color: #16a34a;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      font-size: 12px;
      position: relative;
    ">
      $${price}
      <div style="
        position: absolute;
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        width: 10px;
        height: 10px;
        background-color: white;
        border-right: 2px solid #16a34a;
        border-bottom: 2px solid #16a34a;
      "></div>
    </div>
  `,
  iconSize: [40, 30],
  iconAnchor: [20, 35]
});

const userIcon = L.divIcon({
  className: 'user-marker-pulse',
  html: `
    <div style="position: relative; width: 20px; height: 20px;">
      <div style="
        position: absolute;
        width: 20px;
        height: 20px;
        background-color: #3b82f6;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        z-index: 2;
      "></div>
      <div style="
        position: absolute;
        top: -10px;
        left: -10px;
        width: 40px;
        height: 40px;
        background-color: rgba(59, 130, 246, 0.3);
        border-radius: 50%;
        animation: pulse 2s infinite;
        z-index: 1;
      "></div>
    </div>
    <style>
      @keyframes pulse {
        0% { transform: scale(0.5); opacity: 1; }
        100% { transform: scale(1.5); opacity: 0; }
      }
    </style>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

interface MapViewProps {
  userLocation: { lat: number; lng: number } | null;
  jobs: Job[];
  onSelectJob: (job: Job) => void;
}

const RecenterMap = ({ lat, lng }: { lat: number, lng: number }) => {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lng]);
    }, [lat, lng, map]);
    return null;
}

export const MapView: React.FC<MapViewProps> = ({ userLocation, jobs, onSelectJob }) => {
  if (!userLocation) {
      // Return skeleton or loader for map area
      return <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 animate-pulse">Obteniendo ubicación...</div>
  }

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={[userLocation.lat, userLocation.lng]} 
        zoom={14} 
        zoomControl={false}
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {/* User Location Marker */}
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon} />

        <RecenterMap lat={userLocation.lat} lng={userLocation.lng} />

        {/* Job Markers */}
        {jobs.map(job => (
          <Marker 
            key={job.id} 
            position={[job.location.lat, job.location.lng]}
            icon={createJobIcon(job.price)}
            eventHandlers={{
                click: () => onSelectJob(job),
            }}
          >
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
