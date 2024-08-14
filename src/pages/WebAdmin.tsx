import React, { useState, useEffect } from "react";
import axios from "axios";
import DeliveryList from "../components/DeliveryList";
import PackageList from "../components/PackageList";
import PackageModal from "../components/PackageModal ";
import DeliveryModal from "../components/DeliveryModal";
import "./styles.css";

function WebAdmin() {
  const [packages, setPackages] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/package").then((res) => {
      setPackages(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/delivery").then((res) => {
      setDeliveries(res.data);
    });
  }, []);

  const handlePackageSubmit = (packageData: any) => {
    // Submit package data to backend
    axios.post("http://localhost:5000/api/package", packageData).then(() => {
      setIsPackageModalOpen(false);
      // Reload or refresh the package list
    });
  };

  const handleDeliverySubmit = (deliveryData: any) => {
    // Submit delivery data to backend
    axios.post("http://localhost:5000/api/delivery", deliveryData).then(() => {
      setIsDeliveryModalOpen(false);
      // Reload or refresh the delivery list
    });
  };

  return (
    <div className="webadmin">
      <div className="container">
        <PackageList packages={packages} />
        <button className="button" onClick={() => setIsPackageModalOpen(true)}>
          Create Package
        </button>
      </div>
      <div className="container">
        <DeliveryList deliveries={deliveries} />
        <button className="button" onClick={() => setIsDeliveryModalOpen(true)}>
          Create Delivery
        </button>
      </div>

      <PackageModal
        isOpen={isPackageModalOpen}
        onRequestClose={() => setIsPackageModalOpen(false)}
        onSubmit={handlePackageSubmit}
      />
      <DeliveryModal
        isOpen={isDeliveryModalOpen}
        onRequestClose={() => setIsDeliveryModalOpen(false)}
        onSubmit={handleDeliverySubmit}
      />
    </div>
  );
}

export default WebAdmin;
