export interface KeyValuePair {
  id: number;
  name: string;
}

export interface Contact {
  name: string;
  phone: string;
  email?: any;
}

export interface Vehicle {
  id: number;
  model: KeyValuePair;
  make: KeyValuePair;
  isRegistered: boolean;
  features: KeyValuePair[];
  contact: Contact;
  lastUpdate: Date;
}

export interface SaveVehicle {
  id: number;
  modelId: number;
  makeId: number;
  isRegistered: boolean;
  features: number[];
  contact: Contact;
}
