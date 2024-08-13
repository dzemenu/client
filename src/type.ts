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
