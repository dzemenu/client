import { useEffect, useState } from "react";

import "../App.css";
import MapProvider from "../components/map";
import axios from "axios";
import { IPackage } from "../type";

function DriverAdmin() {
  const [id, setId] = useState("");
  const [details, setDetails] = useState<IPackage>();
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(`http://localhost:5000/api/delivery/${id}`)
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
  const handleDeliveryUpdate = (status: string) => {
    axios.put(`http://localhost:5000/api/delivery/${id}`, {
      status: status,
    });
  };
  return (
    <div className="main">
      <div className="header">
        <input
          className="input"
          placeholder="Enter Deivery ID"
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
        <div className="buttonGroup">
          <button
            className="button"
            onClick={() => handleDeliveryUpdate("picked-up")}
            style={{ backgroundColor: "#37a4f2" }}
          >
            Picked Up
          </button>
          <button
            className="button"
            onClick={() => handleDeliveryUpdate("in-transit")}
            style={{ backgroundColor: "#f9b011" }}
          >
            In-transit
          </button>
          <button
            className="button"
            onClick={() => handleDeliveryUpdate("delivered")}
            style={{ backgroundColor: "#27b227" }}
          >
            Deliveried
          </button>
          <button
            className="button"
            onClick={() => handleDeliveryUpdate("failed")}
            style={{ backgroundColor: "#db2929" }}
          >
            Failed
          </button>
        </div>
      </div>
    </div>
  );
}

export default DriverAdmin;
