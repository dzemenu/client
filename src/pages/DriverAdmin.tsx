import { useEffect, useState } from "react";
import "../App.css";
import MapProvider from "../components/map";
import axios from "axios";
import { IPackage, Delivery } from "../type";

function DriverAdmin() {
  const [id, setId] = useState("");
  const [deliveryDetails, setDeliveryDetails] = useState<Delivery | null>(null);
  const [packageDetails, setPackageDetails] = useState<IPackage | null>(null);
  console.log("first", packageDetails);
  const fetchDeliveryDetails = (deliveryId: string) => {
    axios
      .get(`http://localhost:5000/api/delivery/${deliveryId}`)
      .then((res) => {
        if (res.data) {
          setDeliveryDetails(res.data);
          fetchPackageDetails(res.data.package_id); // Fetch package details using the package_id from the delivery
        } else {
          setDeliveryDetails(null);
          setPackageDetails(null);
          alert("Not a valid ID");
        }
      })
      .catch((err) => console.log(err));
  };

  const fetchPackageDetails = (packageId: string) => {
    axios
      .get(`http://localhost:5000/api/package/${packageId}`)
      .then((res) => {
        if (res.data) {
          setPackageDetails(res.data.package);
        } else {
          setPackageDetails(null);
          alert("Package not found");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      fetchDeliveryDetails(id);
    }
  };

  const handleDeliveryUpdate = (status: string) => {
    let time = {};
    if (status === "picked-up")
      time = { status: status, pickup_time: new Date().toISOString() };
    if (status === "in-transit")
      time = { status: status, start_time: new Date().toISOString() };
    if (status === "delivered")
      time = { status: status, end_time: new Date().toISOString() };

    axios
      .put(`http://localhost:5000/api/delivery/${id}`, time)
      .then(() => fetchDeliveryDetails(id)) // Refresh the details after update
      .catch((err) => console.log(err));
  };

  return (
    <div className="main">
      <div className="header">
        <input
          className="input"
          placeholder="Enter Delivery ID"
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
          {packageDetails && deliveryDetails && (
            <ul>
              <h1>Package Details</h1>
              <li>
                <p>
                  <b>Package ID:</b> {packageDetails.package_id}
                </p>
              </li>
              <li>
                <p>
                  <b>Description:</b> {packageDetails.description}
                </p>
              </li>
              <li>
                <p>
                  <b>Weight:</b> {packageDetails.weight} grams
                </p>
              </li>
              <li>
                <p>
                  <b>Width:</b> {packageDetails.width} cm
                </p>
              </li>
              <li>
                <p>
                  <b>Height:</b> {packageDetails.height} cm
                </p>
              </li>
              <li>
                <p>
                  <b>Depth:</b> {packageDetails.depth} cm
                </p>
              </li>
              <h1>Delivery Details</h1>
              <li>
                <p>
                  <b>Delivery ID:</b> {deliveryDetails._id}
                </p>
              </li>
              <li>
                <p>
                  <b>Pickup Time:</b> {deliveryDetails.pickup_time}
                </p>
              </li>
              <li>
                <p>
                  <b>Start Time:</b> {deliveryDetails.start_time}
                </p>
              </li>
              <li>
                <p>
                  <b>End Time:</b> {deliveryDetails.end_time}
                </p>
              </li>
              <li>
                <p>
                  <b>Status:</b> {deliveryDetails.status}
                </p>
              </li>
            </ul>
          )}
        </div>
        <div className="map">
          {packageDetails && deliveryDetails && (
            <MapProvider
              from_location={packageDetails.from_location}
              to_location={packageDetails.to_location}
              current_location={deliveryDetails.location}
            />
          )}
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
            Delivered
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
