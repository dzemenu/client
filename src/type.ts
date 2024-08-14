export interface ILocation {
  lat: number;
  lng: number;
}

export interface IPackage {
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
export interface Delivery {
  _id: string; // UUID or ObjectId
  package_id: string; // UUID or ObjectId
  pickup_time: string; // ISO8601 date string
  start_time: string; // ISO8601 date string
  end_time: string; // ISO8601 date string
  location: ILocation; // Location object
  status: "open" | "picked-up" | "in-transit" | "delivered" | "failed"; // Enum-like status
}
// types.d.ts (you can create this file for shared types)

export interface PackageData {
  description: string;
  weight: string;
  width: string;
  height: string;
  depth: string;
  from_name: string;
  from_address: string;
  from_location: ILocation;
  to_name: string;
  to_address: string;
  to_location: ILocation;
}

export interface PackageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (data: PackageData) => void;
}

export interface DeliveryData {
  description: string;
  sender_name: string;
  sender_address: string;
  sender_location: ILocation;
  recipient_name: string;
  recipient_address: string;
  recipient_location: ILocation;
  delivery_date: string;
  status: string;
}

export interface DeliveryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (deliveryData: DeliveryData) => void;
}
