export interface UserGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  accessLevel: string;
  createdAt: string;
  status: "Active" | "Inactive";
}

export const mockUserGroups: UserGroup[] = [
  {
    id: "1",
    name: "HR Team",
    description: "Human Resources department staff",
    memberCount: 12,
    accessLevel: "Full Access",
    createdAt: "2024-01-15",
    status: "Active",
  },
  {
    id: "2",
    name: "Facilities Management",
    description: "Building and facilities maintenance team",
    memberCount: 8,
    accessLevel: "Patch Particular",
    createdAt: "2024-02-01",
    status: "Active",
  },
  {
    id: "3",
    name: "Guests",
    description: "Temporary visitors and guests",
    memberCount: 24,
    accessLevel: "Limited Access",
    createdAt: "2024-01-20",
    status: "Active",
  },
  {
    id: "4",
    name: "Executives",
    description: "C-level executives and management",
    memberCount: 5,
    accessLevel: "Full Access",
    createdAt: "2024-01-10",
    status: "Active",
  },
  {
    id: "5",
    name: "Sales Department",
    description: "Sales and marketing team members",
    memberCount: 15,
    accessLevel: "Standard Access",
    createdAt: "2024-03-01",
    status: "Active",
  },
  {
    id: "6",
    name: "IT Department",
    description: "Information Technology team",
    memberCount: 10,
    accessLevel: "Full Access",
    createdAt: "2024-01-05",
    status: "Active",
  },
  {
    id: "7",
    name: "Managers",
    description: "Department managers and team leads",
    memberCount: 8,
    accessLevel: "Full Access",
    createdAt: "2024-02-15",
    status: "Active",
  },
  {
    id: "8",
    name: "Cleaning Crew",
    description: "Janitorial and cleaning staff",
    memberCount: 6,
    accessLevel: "Limited Access",
    createdAt: "2024-04-01",
    status: "Inactive",
  },
];
