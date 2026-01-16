export interface DashboardStats {
  todaysAttendance: {
    percentage: number;
    usersToday: number;
  };
  activeUsers: {
    count: number;
    pendingUsers: number;
  };
  devices: {
    count: number;
    deviceGroups: number;
  };
  creditStatus: {
    count: number;
    creditsMonthly: number;
  };
}

export const dashboardStats: DashboardStats = {
  todaysAttendance: {
    percentage: 88,
    usersToday: 45,
  },
  activeUsers: {
    count: 51,
    pendingUsers: 11,
  },
  devices: {
    count: 15,
    deviceGroups: 4,
  },
  creditStatus: {
    count: 3,
    creditsMonthly: 15,
  },
};

export interface UsageData {
  hour: number;
  value: number;
}

export const usageData: UsageData[] = [
  { hour: 7, value: 25 },
  { hour: 8, value: 45 },
  { hour: 9, value: 180 },
  { hour: 10, value: 12 },
  { hour: 11, value: 165 },
  { hour: 12, value: 85 },
  { hour: 13, value: 70 },
  { hour: 14, value: 145 },
  { hour: 15, value: 160 },
  { hour: 16, value: 175 },
  { hour: 17, value: 190 },
  { hour: 18, value: 155 },
  { hour: 19, value: 95 },
  { hour: 20, value: 120 },
];

export interface RecentAction {
  id: string;
  eventTime: string;
  event: "User Activated" | "User Revoked" | "User Suspended" | "Access Granted" | "Door Opened" | "Failed Attempt";
  userId: string;
  userName: string;
  device: string;
}

export const recentActions: RecentAction[] = [
  {
    id: "1",
    eventTime: "2025/01/09 - 14:32:15",
    event: "User Activated",
    userId: "12345",
    userName: "James Wilson",
    device: "Main Entrance",
  },
  {
    id: "2",
    eventTime: "2025/01/09 - 14:28:42",
    event: "User Revoked",
    userId: "4321",
    userName: "Sarah Chen",
    device: "Server Room",
  },
  {
    id: "3",
    eventTime: "2025/01/09 - 14:25:18",
    event: "User Suspended",
    userId: "12345",
    userName: "James Wilson",
    device: "Front Door",
  },
  {
    id: "4",
    eventTime: "2025/01/09 - 14:20:05",
    event: "Access Granted",
    userId: "5678",
    userName: "Michael Park",
    device: "Executive Floor",
  },
  {
    id: "5",
    eventTime: "2025/01/09 - 14:15:33",
    event: "Door Opened",
    userId: "9012",
    userName: "Emily Rodriguez",
    device: "Parking Gate",
  },
  {
    id: "6",
    eventTime: "2025/01/09 - 14:10:21",
    event: "Failed Attempt",
    userId: "3456",
    userName: "Unknown",
    device: "Data Center",
  },
  {
    id: "7",
    eventTime: "2025/01/09 - 14:05:47",
    event: "User Activated",
    userId: "7890",
    userName: "David Kim",
    device: "Lobby Turnstile",
  },
  {
    id: "8",
    eventTime: "2025/01/09 - 14:00:12",
    event: "Access Granted",
    userId: "2345",
    userName: "Jessica Lee",
    device: "Meeting Room A",
  },
];

export const deviceGroups = [
  "All Device Groups",
  "Entrance Devices",
  "Biometric Devices",
  "High Security",
  "Parking Devices",
];

export const timeRanges = ["Daily", "Weekly", "Monthly", "Yearly"];
