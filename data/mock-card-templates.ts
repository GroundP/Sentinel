export interface CardTemplate {
  id: string;
  name: string;
  description: string;
  cardType: "Employee" | "Visitor" | "Contractor" | "VIP";
  validityPeriod: string;
  accessZones: string[];
  createdAt: string;
  status: "Active" | "Inactive";
  usageCount: number;
}

export const mockCardTemplates: CardTemplate[] = [
  {
    id: "1",
    name: "Standard Employee Card",
    description: "Default card template for regular employees",
    cardType: "Employee",
    validityPeriod: "1 Year",
    accessZones: ["Lobby", "Office Floors", "Cafeteria", "Parking"],
    createdAt: "2024-01-01",
    status: "Active",
    usageCount: 156,
  },
  {
    id: "2",
    name: "Visitor Pass",
    description: "Temporary access card for visitors",
    cardType: "Visitor",
    validityPeriod: "1 Day",
    accessZones: ["Lobby", "Meeting Rooms"],
    createdAt: "2024-01-05",
    status: "Active",
    usageCount: 342,
  },
  {
    id: "3",
    name: "Contractor Badge",
    description: "Extended access for contractors and vendors",
    cardType: "Contractor",
    validityPeriod: "3 Months",
    accessZones: ["Lobby", "Office Floors", "Service Areas"],
    createdAt: "2024-02-10",
    status: "Active",
    usageCount: 45,
  },
  {
    id: "4",
    name: "Executive Card",
    description: "Full access card for executives and VIPs",
    cardType: "VIP",
    validityPeriod: "2 Years",
    accessZones: ["All Zones"],
    createdAt: "2024-01-01",
    status: "Active",
    usageCount: 12,
  },
  {
    id: "5",
    name: "IT Admin Card",
    description: "Special access for IT administrators",
    cardType: "Employee",
    validityPeriod: "1 Year",
    accessZones: ["All Zones", "Server Room", "Data Center"],
    createdAt: "2024-01-15",
    status: "Active",
    usageCount: 8,
  },
  {
    id: "6",
    name: "Night Shift Card",
    description: "Access card for night shift workers",
    cardType: "Employee",
    validityPeriod: "1 Year",
    accessZones: ["Lobby", "Office Floors", "Parking"],
    createdAt: "2024-03-01",
    status: "Active",
    usageCount: 23,
  },
  {
    id: "7",
    name: "Weekend Access",
    description: "Limited weekend access for authorized personnel",
    cardType: "Employee",
    validityPeriod: "6 Months",
    accessZones: ["Lobby", "Office Floors"],
    createdAt: "2024-04-15",
    status: "Inactive",
    usageCount: 0,
  },
  {
    id: "8",
    name: "VIP Guest Pass",
    description: "Premium visitor access for VIP guests",
    cardType: "VIP",
    validityPeriod: "1 Week",
    accessZones: ["Lobby", "Executive Floor", "Meeting Rooms", "Cafeteria"],
    createdAt: "2024-02-20",
    status: "Active",
    usageCount: 18,
  },
];

export const cardTypes = ["All", "Employee", "Visitor", "Contractor", "VIP"];
export const validityPeriods = ["All", "1 Day", "1 Week", "1 Month", "3 Months", "6 Months", "1 Year", "2 Years"];
