import React from "react";
import { IPackage } from "../type";
interface PackageListProps {
  packages: IPackage[];
}

const PackageList: React.FC<PackageListProps> = ({ packages }) => {
  if (!packages || packages.length === 0) {
    return <p>No packages available.</p>;
  }

  return (
    <ul style={{ listStyleType: "none", color: "black" }}>
      <h1>Package List</h1>
      {packages.map((pkg) => (
        <li
          key={pkg.package_id}
          style={{
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            padding: "1rem",
            marginBottom: "1rem",
            gap: "1rem",
            width: "500px",
          }}
        >
          <strong>Package ID:</strong> {pkg.package_id}
          <br />
          <strong>Description:</strong> {pkg.description}
          <br />
          <strong>Weight:</strong> {pkg.weight} grams
          <br />
          <strong>Dimensions:</strong> {pkg.width} cm (W) x {pkg.height} cm (H)
          x {pkg.depth} cm (D)
          <br />
          {pkg.deliveries && pkg.deliveries.length > 0 && (
            <>
              <strong>Deliveries:</strong> {pkg.deliveries.join(", ")}
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default PackageList;
