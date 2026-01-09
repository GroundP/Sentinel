export interface User {
  id: string;
  userType: string;
  name: string;
  visibleId: string;
  credentialType: string;
  validPeriodStart: string;
  validPeriodEnd: string;
  status: string;
  userGroup: string;
  accessLevel: string;
  floorLevel: string;
  avatar?: string;
}

export const mockUsers: User[] = [
  {
    id: "1",
    userType: "Regular",
    name: "James Wilson",
    visibleId: "1100001",
    credentialType: "Card / Face",
    validPeriodStart: "2024/01/15",
    validPeriodEnd: "2025/01/15",
    status: "Active",
    userGroup: "HR Team",
    accessLevel: "Full Access",
    floorLevel: "All Floors",
  },
  {
    id: "2",
    userType: "Regular",
    name: "Sarah Chen",
    visibleId: "1100002",
    credentialType: "Mobile(+QR) / RF",
    validPeriodStart: "2024/03/01",
    validPeriodEnd: "2025/03/01",
    status: "Active",
    userGroup: "Facilities Management",
    accessLevel: "Patch Particular...",
    floorLevel: "B2, B1, Lobby...",
  },
  {
    id: "3",
    userType: "Regular",
    name: "Michael Park",
    visibleId: "1100003",
    credentialType: "Link Pass / Face",
    validPeriodStart: "2024/06/10",
    validPeriodEnd: "2025/06/10",
    status: "Active",
    userGroup: "Guests",
    accessLevel: "Updated Patch...",
    floorLevel: "B2, B1, Lobby...",
  },
  {
    id: "4",
    userType: "Regular",
    name: "Emily Rodriguez",
    visibleId: "1100004",
    credentialType: "Mobile / Card",
    validPeriodStart: "2024/02/20",
    validPeriodEnd: "2025/02/20",
    status: "Active",
    userGroup: "Executives,Civil La...",
    accessLevel: "Updated Patch...",
    floorLevel: "B2, B1, Lobby...",
  },
  {
    id: "5",
    userType: "Regular",
    name: "David Kim",
    visibleId: "1100005",
    credentialType: "RF / Fingerprint",
    validPeriodStart: "2024/04/15",
    validPeriodEnd: "2025/04/15",
    status: "Active",
    userGroup: "Executives,Civil La...",
    accessLevel: "Updated Patch...",
    floorLevel: "B1, Lobby, F1...",
  },
  {
    id: "6",
    userType: "Regular",
    name: "Jessica Lee",
    visibleId: "1100006",
    credentialType: "Card / Mobile",
    validPeriodStart: "2024/05/01",
    validPeriodEnd: "2025/05/01",
    status: "Active",
    userGroup: "Guests",
    accessLevel: "Limited Access",
    floorLevel: "Lobby, F1",
  },
  {
    id: "7",
    userType: "Regular",
    name: "Robert Taylor",
    visibleId: "1100007",
    credentialType: "Face / Card",
    validPeriodStart: "2024/07/01",
    validPeriodEnd: "2025/07/01",
    status: "Active",
    userGroup: "HR Team",
    accessLevel: "Full Access",
    floorLevel: "All Floors",
  },
  {
    id: "8",
    userType: "Regular",
    name: "Amanda Brown",
    visibleId: "1100008",
    credentialType: "Mobile(+QR)",
    validPeriodStart: "2024/08/15",
    validPeriodEnd: "2025/08/15",
    status: "Active",
    userGroup: "Sales Department",
    accessLevel: "Patch Particular...",
    floorLevel: "Lobby, F2, F3",
  },
  {
    id: "9",
    userType: "Regular",
    name: "Kenji Sato",
    visibleId: "1110002",
    credentialType: "Mobile(+QR) / RF / Face",
    validPeriodStart: "2025/07/09",
    validPeriodEnd: "2026/07/09",
    status: "Inactive",
    userGroup: "Facilities Management",
    accessLevel: "Full Access",
    floorLevel: "B2, B1, Lobby...",
    avatar: "/avatars/kenji.jpg",
  },
  {
    id: "10",
    userType: "Regular",
    name: "Andrei Novak",
    visibleId: "1110003",
    credentialType: "Mobile(+QR) / Card",
    validPeriodStart: "2025/07/09",
    validPeriodEnd: "2026/07/09",
    status: "Inactive",
    userGroup: "Managers",
    accessLevel: "Full Access",
    floorLevel: "Lobby, F3",
    avatar: "/avatars/andrei.jpg",
  },
  {
    id: "11",
    userType: "Admin",
    name: "Sophie Martinez",
    visibleId: "1100010",
    credentialType: "Card / Face / Fingerprint",
    validPeriodStart: "2024/01/01",
    validPeriodEnd: "2026/01/01",
    status: "Active",
    userGroup: "IT Department",
    accessLevel: "Full Access",
    floorLevel: "All Floors",
  },
  {
    id: "12",
    userType: "Guest",
    name: "Thomas Anderson",
    visibleId: "G-00001",
    credentialType: "Link Pass",
    validPeriodStart: "2025/01/08",
    validPeriodEnd: "2025/01/10",
    status: "Active",
    userGroup: "Guests",
    accessLevel: "Limited Access",
    floorLevel: "Lobby",
  },
];

export const userGroups = [
  "All",
  "HR Team",
  "Facilities Management",
  "Guests",
  "Executives",
  "Civil Law",
  "Sales Department",
  "Managers",
  "Cleaning Crew",
  "IT Department",
];

export const accessLevels = [
  "All",
  "Full Access",
  "Patch Particular...",
  "Updated Patch...",
  "Limited Access",
];

export const floorLevels = [
  "All",
  "B2",
  "B1",
  "Lobby",
  "F1",
  "F2",
  "F3",
  "F4",
  "F5",
  "All Floors",
];

export const credentialTypes = [
  "All",
  "Link Pass",
  "Card",
  "Mobile",
  "Mobile(+QR)",
  "RF",
  "Face",
  "Fingerprint",
];

export const userStatuses = ["All", "Activated", "Deactivated", "Inactive"];

export const userTypes = ["All", "Regular", "Admin", "Guest", "Visitor"];
