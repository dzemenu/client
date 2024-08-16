import { useEffect, useState } from "react";
import "../App.css";
import MapProvider from "../components/map";
import axios from "axios";
import { IPackage, Delivery } from "../type";

function WebTracker() {
  const [id, setId] = useState("");
  const [details, setDetails] = useState<IPackage | null>(null);
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`http://localhost:5000/api/package/${id}`);
      if (res.data) {

        setDetails(res.data.package);
        if (res.data.package.active_delivery_id) {
          fetchDeliveryDetails(res.data.package.active_delivery_id);
        }
      } else {
        setDetails(null);
        setDelivery(null);
        alert("Not valid ID");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const fetchDeliveryDetails = async (deliveryId: string) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/delivery/${deliveryId}`
      );
      if (res.data) {
        setDelivery(res.data);
        setCurrentLocation(res.data.location);

        // Establish WebSocket connection for live updates
        const ws = new WebSocket("ws://localhost:5000");
        ws.onopen = () => {
          ws.send(JSON.stringify({ deliveryId: res.data.delivery_id }));
        };
        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          setCurrentLocation(data.location);
          if (data.status) {
            setDelivery((prev) => ({ ...prev, status: data.status }));
          }
        };
        ws.onclose = () => console.log("WebSocket connection closed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main">
      <div className="header">
        <input
          className="input"
          placeholder="Enter Package ID"
          onChange={(e) => setId(e.target.value)}
        />
        <button
          className="button"
          onClick={handleSubmit}
          disabled={id.length < 1}
        >
          Track
        </button>
      </div>
      <div className="section">
        <div className="details">
          {details && (
            <ul>
              <h1>Package Details</h1>
              <li>
                <p>
                  <b>Package ID:</b> {details.package_id}
                </p>
              </li>
              <li>
                <p>
                  <b>Description:</b> {details.description}
                </p>
              </li>
              <li>
                <p>
                  <b>Weight:</b> {details.weight} grams
                </p>
              </li>
              <li>
                <p>
                  <b>Width:</b> {details.width} cm
                </p>
              </li>
              <li>
                <p>
                  <b>Height:</b> {details.height} cm
                </p>
              </li>
              <li>
                <p>
                  <b>Depth:</b> {details.depth} cm
                </p>
              </li>
            </ul>
          )}

          {delivery && (
            <ul>
              <h1>Delivery Details</h1>
              <li>
                <p>
                  <b>Status:</b> {delivery.status}
                </p>
              </li>
              <li>
                <p>
                  <b>Pickup Time:</b>{" "}
                  {new Date(delivery.pickup_time).toLocaleString()}
                </p>
              </li>
              <li>
                <p>
                  <b>Start Time:</b>{" "}
                  {new Date(delivery.start_time).toLocaleString()}
                </p>
              </li>
              <li>
                <p>
                  <b>End Time:</b>{" "}
                  {delivery.end_time
                    ? new Date(delivery.end_time).toLocaleString()
                    : "N/A"}
                </p>
              </li>
              <li>
                <p>
                  <b>Current Location:</b> Lat: {currentLocation.lat}, Lng:{" "}
                  {currentLocation.lng}
                </p>
              </li>
            </ul>
          )}
        </div>
        <div className="map">
          {details && (
            <MapProvider
              from_location={details.from_location}
              to_location={details.to_location}
              current_location={currentLocation}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default WebTracker;
