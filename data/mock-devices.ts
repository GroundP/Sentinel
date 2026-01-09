export interface Device {
  id: string;
  name: string;
  deviceType: "Door Reader" | "Face Scanner" | "Fingerprint" | "Card Reader" | "Turnstile" | "Elevator Controller";
  model: string;
  serialNumber: string;
  location: string;
  floor: string;
  ipAddress: string;
  firmwareVersion: string;
  lastSync: string;
  status: "Online" | "Offline" | "Maintenance";
  deviceGroup: string;
}

export const mockDevices: Device[] = [
  {
    id: "1",
    name: "Main Entrance Reader",
    deviceType: "Door Reader",
    model: "BioEntry W2",
    serialNumber: "BEW2-001234",
    location: "Main Lobby",
    floor: "Lobby",
    ipAddress: "192.168.1.101",
    firmwareVersion: "2.8.1",
    lastSync: "2025-01-09 14:32:00",
    status: "Online",
    deviceGroup: "Entrance Devices",
  },
  {
    id: "2",
    name: "Face Recognition Terminal A",
    deviceType: "Face Scanner",
    model: "FaceStation F2",
    serialNumber: "FSF2-005678",
    location: "Executive Floor",
    floor: "F5",
    ipAddress: "192.168.1.102",
    firmwareVersion: "1.5.2",
    lastSync: "2025-01-09 14:30:00",
    status: "Online",
    deviceGroup: "Biometric Devices",
  },
  {
    id: "3",
    name: "Server Room Access",
    deviceType: "Fingerprint",
    model: "BioEntry P2",
    serialNumber: "BEP2-009012",
    location: "Server Room",
    floor: "B1",
    ipAddress: "192.168.1.103",
    firmwareVersion: "2.7.0",
    lastSync: "2025-01-09 14:28:00",
    status: "Online",
    deviceGroup: "High Security",
  },
  {
    id: "4",
    name: "Parking Gate Reader",
    deviceType: "Card Reader",
    model: "XPass S2",
    serialNumber: "XPS2-003456",
    location: "Parking Entrance",
    floor: "B2",
    ipAddress: "192.168.1.104",
    firmwareVersion: "1.3.1",
    lastSync: "2025-01-09 14:25:00",
    status: "Online",
    deviceGroup: "Parking Devices",
  },
  {
    id: "5",
    name: "Main Lobby Turnstile 1",
    deviceType: "Turnstile",
    model: "Speedlane Swing",
    serialNumber: "SLS-007890",
    location: "Main Lobby",
    floor: "Lobby",
    ipAddress: "192.168.1.105",
    firmwareVersion: "3.1.0",
    lastSync: "2025-01-09 14:20:00",
    status: "Online",
    deviceGroup: "Entrance Devices",
  },
  {
    id: "6",
    name: "Main Lobby Turnstile 2",
    deviceType: "Turnstile",
    model: "Speedlane Swing",
    serialNumber: "SLS-007891",
    location: "Main Lobby",
    floor: "Lobby",
    ipAddress: "192.168.1.106",
    firmwareVersion: "3.1.0",
    lastSync: "2025-01-09 14:20:00",
    status: "Online",
    deviceGroup: "Entrance Devices",
  },
  {
    id: "7",
    name: "Elevator Controller A",
    deviceType: "Elevator Controller",
    model: "CoreStation",
    serialNumber: "CS-002345",
    location: "Elevator Bank A",
    floor: "Lobby",
    ipAddress: "192.168.1.107",
    firmwareVersion: "2.0.5",
    lastSync: "2025-01-09 14:15:00",
    status: "Online",
    deviceGroup: "Elevator Devices",
  },
  {
    id: "8",
    name: "Back Entrance Reader",
    deviceType: "Door Reader",
    model: "BioEntry W2",
    serialNumber: "BEW2-001235",
    location: "Back Entrance",
    floor: "Lobby",
    ipAddress: "192.168.1.108",
    firmwareVersion: "2.8.1",
    lastSync: "2025-01-08 18:00:00",
    status: "Offline",
    deviceGroup: "Entrance Devices",
  },
  {
    id: "9",
    name: "HR Office Reader",
    deviceType: "Door Reader",
    model: "BioLite N2",
    serialNumber: "BLN2-004567",
    location: "HR Department",
    floor: "F3",
    ipAddress: "192.168.1.109",
    firmwareVersion: "1.9.2",
    lastSync: "2025-01-09 10:00:00",
    status: "Maintenance",
    deviceGroup: "Office Devices",
  },
  {
    id: "10",
    name: "Data Center Biometric",
    deviceType: "Fingerprint",
    model: "BioEntry P2",
    serialNumber: "BEP2-009013",
    location: "Data Center",
    floor: "B1",
    ipAddress: "192.168.1.110",
    firmwareVersion: "2.7.0",
    lastSync: "2025-01-09 14:30:00",
    status: "Online",
    deviceGroup: "High Security",
  },
];

export const deviceTypes = [
  "All",
  "Door Reader",
  "Face Scanner",
  "Fingerprint",
  "Card Reader",
  "Turnstile",
  "Elevator Controller",
];

export const deviceStatuses = ["All", "Online", "Offline", "Maintenance"];

export const deviceFloors = ["All", "B2", "B1", "Lobby", "F1", "F2", "F3", "F4", "F5"];
