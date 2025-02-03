"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// Cargar imágenes manualmente para Leaflet
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

interface MapViewProps {
  latitude: number;
  longitude: number;
}

const customIcon = new L.Icon({
  iconUrl: markerIconPng.src,
  shadowUrl: markerShadowPng.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const ChangeView = ({ latitude, longitude }: MapViewProps) => {
  const map = useMap();

  useEffect(() => {
    map.setView([latitude, longitude], 13);
  }, [latitude, longitude, map]);

  return null;
};

const MapView: React.FC<MapViewProps> = ({ latitude, longitude }) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  const handleGetUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Error obteniendo ubicación del usuario:", error);
      }
    );
  };

  return (
    <div className="relative">
      <MapContainer className="w-full h-64 rounded-md overflow-hidden shadow-lg">
        <ChangeView latitude={latitude} longitude={longitude} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Marcador de la IP */}
        <Marker position={[latitude, longitude]} icon={customIcon}>
          <Popup>Ubicación de la IP</Popup>
        </Marker>

        {/* Marcador de la Ubicación del Usuario */}
        {userLocation && (
          <Marker position={userLocation} icon={customIcon}>
            <Popup>Tu ubicación</Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Botón para centrar en la ubicación del usuario */}
      <button
        onClick={handleGetUserLocation}
        className="absolute bottom-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-md"
      >
        📍 Mi Ubicación
      </button>
    </div>
  );
};

export default MapView;
