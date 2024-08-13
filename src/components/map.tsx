import * as React from "react";
import Map, { MapRef, Marker } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import { ILocation } from "../type";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const MapProvider: React.FC<{ to_location: ILocation }> = ({ to_location }) => {
  const mapRef = useRef<MapRef | null>(null);

  useEffect(() => {
    if (mapRef.current && to_location) {
      mapRef.current.flyTo({
        center: [to_location.lng, to_location.lat],
        zoom: 14,
        essential: true,
      });
    }
  }, [to_location]);

  return (
    <Map
      initialViewState={{
        latitude: to_location?.lat || 37.8,
        longitude: to_location?.lng || -122.4,
        zoom: 14,
      }}
      style={{ width: 800, height: 600 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
      ref={mapRef}
    >
      <Marker
        longitude={to_location?.lng || -122.4}
        latitude={to_location?.lat || 37.8}
        color="red"
        style={{ cursor: "pointer" }}
      />
    </Map>
  );
};

export default MapProvider;
