import * as React from "react";
import Map, { MapRef, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import { ILocation } from "../type";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const MapProvider: React.FC<{
  to_location: ILocation;
  from_location: ILocation;
  current_location: ILocation;
}> = ({ to_location, from_location, current_location }) => {
  const mapRef = useRef<MapRef | null>(null);

  useEffect(() => {
    if (mapRef.current && current_location) {
      mapRef.current.flyTo({
        center: [current_location.lng, current_location.lat],
        zoom: 14,
        essential: true,
      });
    }
  }, [current_location]);

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
      {from_location && (
        <Marker
          longitude={from_location.lng}
          latitude={from_location.lat}
          color="blue"
          style={{ cursor: "pointer" }}
        />
      )}

      {to_location && (
        <Marker
          longitude={to_location.lng}
          latitude={to_location.lat}
          color="green"
          style={{ cursor: "pointer" }}
        />
      )}

      {current_location && (
        <Marker
          longitude={current_location.lng}
          latitude={current_location.lat}
          color="red"
          style={{ cursor: "pointer" }}
        />
      )}
    </Map>
  );
};

export default MapProvider;
