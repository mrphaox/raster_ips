"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useEffect } from "react";

interface MapViewProps {
  latitude: number;
  longitude: number;
}

const ChangeView = ({ latitude, longitude }: MapViewProps) => {
  const map = useMap();

  useEffect(() => {
    const position: LatLngExpression = [latitude, longitude];
    map.setView(position, 13); // ✅ Actualiza la vista del mapa
  }, [latitude, longitude, map]);

  return null;
};

const MapView: React.FC<MapViewProps> = ({ latitude, longitude }) => {
  return (
    <MapContainer
      className="w-full h-64 rounded-md overflow-hidden shadow-lg"
      style={{ height: "300px", width: "100%" }}
    >
      {/* Componente que cambia la vista cuando se obtiene una nueva IP */}
      <ChangeView latitude={latitude} longitude={longitude} />
      
      {/* Mapa con capa de OpenStreetMap */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {/* Marcador de la ubicación de la IP */}
      <Marker position={[latitude, longitude]}>
        <Popup>Ubicación aproximada</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
