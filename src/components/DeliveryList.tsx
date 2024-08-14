import React from "react";
import { Delivery } from "../type";
interface DeliveryListProps {
  deliveries: Delivery[];
}
const DeliveryList: React.FC<DeliveryListProps> = ({ deliveries }) => {
  if (!deliveries || deliveries.length === 0) {
    return <p>No deliveries available.</p>;
  }

  return (
    <ul
      style={{
        listStyleType: "none",
        color: "black",
      }}
    >
      <h1>Delivery List</h1>
      {deliveries.map((delivery) => (
        <li
          key={delivery._id}
          style={{
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            padding: "1rem",
            marginBottom: "1rem",
            gap: "1rem",
            width: "500px",
          }}
        >
          <strong>Delivery ID:</strong> {delivery._id}
          <br />
          <strong>Package ID:</strong> {delivery.package_id}
          <br />
          <strong>Status:</strong> {delivery.status}
          <br />
          <strong>Location:</strong>{" "}
          {`Lat: ${delivery.location.lat}, Lng: ${delivery.location.lng}`}
        </li>
      ))}
    </ul>
  );
};

export default DeliveryList;
