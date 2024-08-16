import React, { useState, ChangeEvent, FormEvent } from "react";
import Modal from "react-modal";
import { PackageData, PackageModalProps } from "../type";
import "./PackageModal.css"; // Import the CSS file

Modal.setAppElement("#root"); // Required for accessibility

const PackageModal: React.FC<PackageModalProps> = ({
  isOpen,
  onRequestClose,
  onSubmit,
}) => {
  const [packageData, setPackageData] = useState<PackageData>({
    description: "",
    weight: "",
    width: "",
    height: "",
    depth: "",
    from_name: "",
    from_address: "",
    from_location: { lat: 0, lng: 0 },
    to_name: "",
    to_address: "",
    to_location: { lat: 0, lng: 0 },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPackageData((prevState) => {
      if (name.includes(".")) {
        const [key, subkey] = name.split(".");

        return {
          ...prevState,
          [key]: {
            ...prevState[key as keyof PackageData],
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
    onSubmit(packageData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create Package"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Create Package</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={packageData.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Weight (gram):
          <input
            type="number"
            name="weight"
            value={packageData.weight}
            onChange={handleChange}
            required
          />
        </label>
        <div className="input-group">
          <label>
            Width (cm):
            <input
              type="number"
              name="width"
              value={packageData.width}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Height (cm):
            <input
              type="number"
              name="height"
              value={packageData.height}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Depth (cm):
            <input
              type="number"
              name="depth"
              value={packageData.depth}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <label>
          From Name:
          <input
            type="text"
            name="from_name"
            value={packageData.from_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          From Address:
          <input
            type="text"
            name="from_address"
            value={packageData.from_address}
            onChange={handleChange}
            required
          />
        </label>
        <div className="input-group">
          <label>
            From Location (lat):
            <input
              type="number"
              step="any"
              name="from_location.lat"
              value={packageData.from_location.lat}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            From Location (lng):
            <input
              type="number"
              step="any"
              name="from_location.lng"
              value={packageData.from_location.lng}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <label>
          To Name:
          <input
            type="text"
            name="to_name"
            value={packageData.to_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          To Address:
          <input
            type="text"
            name="to_address"
            value={packageData.to_address}
            onChange={handleChange}
            required
          />
        </label>
        <div className="input-group">
          <label>
            To Location (lat):
            <input
              type="number"
              step="any"
              name="to_location.lat"
              value={packageData.to_location.lat}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            To Location (lng):
            <input
              type="number"
              step="any"
              name="to_location.lng"
              value={packageData.to_location.lng}
              onChange={handleChange}
              required
            />
          </label>
        </div>
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

export default PackageModal;
