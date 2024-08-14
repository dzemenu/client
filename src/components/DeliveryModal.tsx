import React, { useState, ChangeEvent, FormEvent } from "react";
import Modal from "react-modal";
import { DeliveryData, DeliveryModalProps } from "../type";
import "./PackageModal.css";

Modal.setAppElement("#root");

const DeliveryModal: React.FC<DeliveryModalProps> = ({
  isOpen,
  onRequestClose,
  onSubmit,
}) => {
  const [deliveryData, setDeliveryData] = useState<DeliveryData>({
    description: "",
    sender_name: "",
    sender_address: "",
    sender_location: { lat: 0, lng: 0 },
    recipient_name: "",
    recipient_address: "",
    recipient_location: { lat: 0, lng: 0 },
    delivery_date: "",
    status: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setDeliveryData((prevState) => {
      if (name.includes(".")) {
        const [key, subkey] = name.split(".");

        return {
          ...prevState,
          [key]: {
            ...prevState[key as keyof DeliveryData],
            [subkey]: value,
          },
        };
      } else {
        return {
          ...prevState,
          [name]: value,
        };
      }
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(deliveryData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create Delivery"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Create Delivery</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={deliveryData.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Sender Name:
          <input
            type="text"
            name="sender_name"
            value={deliveryData.sender_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Sender Address:
          <input
            type="text"
            name="sender_address"
            value={deliveryData.sender_address}
            onChange={handleChange}
            required
          />
        </label>
        <div className="input-group">
          <label>
            Sender Location (lat):
            <input
              type="number"
              step="any"
              name="sender_location.lat"
              value={deliveryData.sender_location.lat}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Sender Location (lng):
            <input
              type="number"
              step="any"
              name="sender_location.lng"
              value={deliveryData.sender_location.lng}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <label>
          Recipient Name:
          <input
            type="text"
            name="recipient_name"
            value={deliveryData.recipient_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Recipient Address:
          <input
            type="text"
            name="recipient_address"
            value={deliveryData.recipient_address}
            onChange={handleChange}
            required
          />
        </label>
        <div className="input-group">
          <label>
            Recipient Location (lat):
            <input
              type="number"
              step="any"
              name="recipient_location.lat"
              value={deliveryData.recipient_location.lat}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Recipient Location (lng):
            <input
              type="number"
              step="any"
              name="recipient_location.lng"
              value={deliveryData.recipient_location.lng}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <label>
          Delivery Date:
          <input
            type="date"
            name="delivery_date"
            value={deliveryData.delivery_date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Status:
          <input
            type="text"
            name="status"
            value={deliveryData.status}
            onChange={handleChange}
            required
          />
        </label>
        <div className="modal-footer">
          <button type="submit">Submit</button>
          <button type="button" onClick={onRequestClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default DeliveryModal;
