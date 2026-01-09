export interface DeviceGroup {
  id: string;
  name: string;
  description: string;
  deviceCount: number;
  location: string;
  createdAt: string;
  status: "Active" | "Inactive";
}

export const mockDeviceGroups: DeviceGroup[] = [
  {
    id: "1",
    name: "Entrance Devices",
    description: "All devices at building entrances and exits",
    deviceCount: 4,
    location: "Main Lobby, Back Entrance",
    createdAt: "2024-01-01",
    status: "Active",
  },
  {
    id: "2",
    name: "Biometric Devices",
    description: "Face recognition and fingerprint scanners",
    deviceCount: 3,
    location: "Various",
    createdAt: "2024-01-05",
    status: "Active",
  },
  {
    id: "3",
    name: "High Security",
    description: "Devices protecting sensitive areas",
    deviceCount: 2,
    location: "Server Room, Data Center",
    createdAt: "2024-01-10",
    status: "Active",
  },
  {
    id: "4",
    name: "Parking Devices",
    description: "Parking garage access control devices",
    deviceCount: 3,
    location: "B1, B2 Parking",
    createdAt: "2024-02-01",
    status: "Active",
  },
  {
    id: "5",
    name: "Elevator Devices",
    description: "Elevator access control systems",
    deviceCount: 2,
    location: "Elevator Banks",
    createdAt: "2024-01-15",
    status: "Active",
  },
  {
    id: "6",
    name: "Office Devices",
    description: "Department and office door readers",
    deviceCount: 12,
    location: "Office Floors",
    createdAt: "2024-01-20",
    status: "Active",
  },
  {
    id: "7",
    name: "Meeting Rooms",
    description: "Conference and meeting room access",
    deviceCount: 8,
    location: "All Floors",
    createdAt: "2024-03-01",
    status: "Active",
  },
  {
    id: "8",
    name: "Emergency Exits",
    description: "Emergency exit door monitoring",
    deviceCount: 6,
    location: "All Floors",
    createdAt: "2024-02-15",
    status: "Inactive",
  },
];
