import { useEffect, useState } from "react";

import "../App.css";
import MapProvider from "../components/map";
import axios from "axios";
export interface ILocation {
  lat: number;
  lng: number;
}

interface IPackage {
  package_id: string;
  active_delivery_id: string;
  description: string;
  weight: number; // in grams
  width: number; // in cm
  height: number; // in cm
  depth: number; // in cm
  from_name: string;
  from_address: string;
  from_location: ILocation;
  to_name: string;
  to_address: string;
  to_location: ILocation;
  deliveries?: string[]; // Array of Delivery ObjectIDs
}

function WebTracker() {
  const [id, setId] = useState("");
  const [details, setDetails] = useState<IPackage>();
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(`http://localhost:5000/api/package/${id}`)
      .then((res) => {
        if (res.data) {
          setDetails(res.data);
        } else {
          setDetails([]);
          alert("Not valid ID");
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {}, [details]);
  return (
    <div className="main">
      <div className="header">
        <input
          className="input"
          placeholder="Enter Deivery ID"
          onChange={(e) => setId(e.target.value)}
        />
        <button className="button" onClick={handleSubmit}>
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
                  <b>description:</b> {details.description}
                </p>
              </li>
              <li>
                <p>
                  <b>Weight:</b> {details.weight}grams
                </p>
              </li>
              <li>
                <p>
                  <b>Width:</b> {details.width}cm
                </p>
              </li>
              <li>
                <p>
                  <b>Height:</b> {details.height}cm
                </p>
              </li>
              <li>
                <p>
                  <b>Depth:</b> {details.depth}cm
                </p>
              </li>
              <h1>Delivery Details</h1>
            </ul>
          )}
        </div>
        <div className="map">
          {details && <MapProvider to_location={details?.to_location} />}
        </div>
      </div>
    </div>
  );
}

export default WebTracker;
