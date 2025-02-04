"use client"; // Asegura que solo se renderiza en el cliente

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import L from "leaflet";

// Cargar `react-leaflet` dinámicamente SOLO en el cliente
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

import "leaflet/dist/leaflet.css";

// Solución para los íconos de Leaflet
const customIcon = L.icon({
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapViewProps {
  latitude: number;
  longitude: number;
}

const MapView: React.FC<MapViewProps> = ({ latitude, longitude }) => {
  const [isClient, setIsClient] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    setIsClient(true); // Asegurar que solo se renderiza en el cliente
  }, []);

  const handleGetUserLocation = () => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error obteniendo ubicación del usuario:", error);
        }
      );
    }
  };

  if (!isClient) return <p className="text-center text-gray-500">Cargando mapa...</p>;

  return (
    <div className="relative">
      <MapContainer center={[latitude, longitude]} zoom={13} className="w-full h-64 rounded-md overflow-hidden shadow-lg">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={[latitude, longitude]} icon={customIcon}>
          <Popup>Ubicación de la IP</Popup>
        </Marker>

        {userLocation && (
          <Marker position={userLocation} icon={customIcon}>
            <Popup>Tu ubicación</Popup>
          </Marker>
        )}
      </MapContainer>

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
