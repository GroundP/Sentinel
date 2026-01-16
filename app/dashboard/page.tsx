"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  ColDef,
  ICellRendererParams,
  themeQuartz,
  GridApi,
  RowClassRules,
} from "ag-grid-community";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
  Tooltip,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  dashboardStats,
  usageData,
  recentActions,
  deviceGroups,
  timeRanges,
  RecentAction,
} from "@/data/mock-dashboard";
import {
  Users,
  Smartphone,
  CreditCard,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Bell,
  Circle,
} from "lucide-react";

ModuleRegistry.registerModules([AllCommunityModule]);

// Extended RecentAction with isNew flag
interface RecentActionWithStatus extends RecentAction {
  isNew?: boolean;
}

// Random event generator
const eventTypes: RecentAction["event"][] = [
  "User Activated",
  "User Revoked",
  "User Suspended",
  "Access Granted",
  "Door Opened",
  "Failed Attempt",
];

const userNames = [
  "James Wilson",
  "Sarah Chen",
  "Michael Park",
  "Emily Rodriguez",
  "David Kim",
  "Jessica Lee",
  "Robert Taylor",
  "Amanda Brown",
];

const devices = [
  "Main Entrance",
  "Server Room",
  "Front Door",
  "Executive Floor",
  "Parking Gate",
  "Data Center",
  "Lobby Turnstile",
  "Meeting Room A",
  "Back Entrance",
  "HR Office",
];

function generateRandomEvent(id: number): RecentActionWithStatus {
  const now = new Date();
  const eventTime = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}/${String(
    now.getDate()
  ).padStart(2, "0")} - ${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

  return {
    id: `new-${id}`,
    eventTime,
    event: eventTypes[Math.floor(Math.random() * eventTypes.length)],
    userId: String(Math.floor(10000 + Math.random() * 90000)),
    userName: userNames[Math.floor(Math.random() * userNames.length)],
    device: devices[Math.floor(Math.random() * devices.length)],
    isNew: true,
  };
}

// Event cell renderer
const EventCellRenderer = (params: ICellRendererParams<RecentActionWithStatus>) => {
  const event = params.value;
  if (!event) return null;

  const eventStyles: Record<string, string> = {
    "User Activated": "bg-green-100 text-green-700",
    "User Revoked": "bg-red-100 text-red-700",
    "User Suspended": "bg-yellow-100 text-yellow-700",
    "Access Granted": "bg-blue-100 text-blue-700",
    "Door Opened": "bg-cyan-100 text-cyan-700",
    "Failed Attempt": "bg-red-100 text-red-700",
  };

  return (
    <Badge variant="secondary" className={eventStyles[event] || "bg-gray-100 text-gray-700"}>
      {event}
    </Badge>
  );
};

const sentinelTheme = themeQuartz.withParams({
  backgroundColor: "#FFFFFF",
  browserColorScheme: "light",
  chromeBackgroundColor: "#FFFFFF",
  fontFamily: "inherit",
  foregroundColor: "#1E293B",
  headerBackgroundColor: "#FFFFFF",
  headerFontSize: 13,
  headerFontWeight: 500,
  headerTextColor: "#64748B",
  rowBorder: { color: "#E2E8F0", style: "solid", width: 1 },
  oddRowBackgroundColor: "#FFFFFF",
  borderColor: "#E2E8F0",
  spacing: 8,
  wrapperBorderRadius: 8,
});

// Stats Card Component
function StatsCard({
  title,
  value,
  subtitle,
  icon,
  iconBgColor,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  iconBgColor: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${iconBgColor}`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-gray-500">{title}</span>
          <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
        </div>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        <div className="text-xs font-medium uppercase tracking-wide text-gray-400">{subtitle}</div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [selectedDeviceGroup, setSelectedDeviceGroup] = useState("All Device Groups");
  const [selectedTimeRange, setSelectedTimeRange] = useState("Daily");
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 9));
  const [rowData, setRowData] = useState<RecentActionWithStatus[]>(
    recentActions.map((action) => ({ ...action, isNew: false }))
  );
  const [newEventCount, setNewEventCount] = useState(0);
  const [isLive, setIsLive] = useState(true);
  const gridApiRef = useRef<GridApi<RecentActionWithStatus> | null>(null);
  const eventIdCounter = useRef(0);

  // Add new events periodically
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const newEvent = generateRandomEvent(eventIdCounter.current++);

      setRowData((prev) => {
        // Mark all existing "new" events as not new
        const updated = prev.map((item) => ({ ...item, isNew: false }));
        // Add new event at the beginning
        return [newEvent, ...updated].slice(0, 50); // Keep max 50 items
      });

      setNewEventCount((prev) => prev + 1);

      // Flash the grid row
      if (gridApiRef.current) {
        setTimeout(() => {
          gridApiRef.current?.flashCells({
            rowNodes: gridApiRef.current?.getRenderedNodes().slice(0, 1),
          });
        }, 100);
      }
    }, 15000); // Add new event every 15 seconds

    return () => clearInterval(interval);
  }, [isLive]);

  // Clear new status after animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setRowData((prev) => prev.map((item) => ({ ...item, isNew: false })));
    }, 3000);

    return () => clearTimeout(timeout);
  }, [rowData]);

  const columnDefs = useMemo<ColDef<RecentActionWithStatus>[]>(
    () => [
      {
        field: "eventTime",
        headerName: "Event Time",
        width: 200,
        sortable: true,
        cellRenderer: (params: ICellRendererParams<RecentActionWithStatus>) => {
          const isNew = params.data?.isNew;
          return (
            <div className="flex items-center gap-2">
              {isNew && <Circle className="h-2 w-2 fill-green-500 text-green-500 animate-pulse" />}
              <span>{params.value}</span>
            </div>
          );
        },
      },
      {
        field: "event",
        headerName: "Event",
        width: 160,
        cellRenderer: EventCellRenderer,
      },
      {
        field: "userId",
        headerName: "User ID",
        width: 120,
      },
      {
        field: "userName",
        headerName: "User Name",
        width: 180,
        cellClass: "font-medium",
      },
      {
        field: "device",
        headerName: "Device",
        width: 180,
      },
    ],
    []
  );

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      resizable: true,
    }),
    []
  );

  const rowClassRules = useMemo<RowClassRules<RecentActionWithStatus>>(
    () => ({
      "new-row-highlight": (params) => params.data?.isNew === true,
    }),
    []
  );

  const onGridReady = useCallback((params: { api: GridApi<RecentActionWithStatus> }) => {
    gridApiRef.current = params.api;
  }, []);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const navigateDate = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setDate(newDate.getDate() - 1);
      } else {
        newDate.setDate(newDate.getDate() + 1);
      }
      return newDate;
    });
  };

  const clearNewEvents = () => {
    setNewEventCount(0);
  };

  return (
    <div className="flex h-full flex-col gap-6">
      {/* Custom CSS for row highlight animation */}
      <style jsx global>{`
        .new-row-highlight {
          animation: highlight-fade 3s ease-out;
        }
        @keyframes highlight-fade {
          0% {
            background-color: rgba(34, 197, 94, 0.3);
          }
          100% {
            background-color: transparent;
          }
        }
        .ag-row-animation {
          transition: background-color 0.5s ease;
        }
      `}</style>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatsCard
          title="Todays Attendance"
          value={`${dashboardStats.todaysAttendance.percentage}%`}
          subtitle={`${dashboardStats.todaysAttendance.usersToday} USERS TODAY`}
          icon={<LayoutGrid className="h-6 w-6 text-[#6366F1]" />}
          iconBgColor="bg-[#EEF2FF]"
        />
        <StatsCard
          title="Active Users"
          value={dashboardStats.activeUsers.count}
          subtitle={`${dashboardStats.activeUsers.pendingUsers} PENDING USERS`}
          icon={<Users className="h-6 w-6 text-[#EC4899]" />}
          iconBgColor="bg-[#FCE7F3]"
        />
        <StatsCard
          title="Devices"
          value={dashboardStats.devices.count}
          subtitle={`${dashboardStats.devices.deviceGroups} DEVICE GROUPS`}
          icon={<Smartphone className="h-6 w-6 text-[#06B6D4]" />}
          iconBgColor="bg-[#CFFAFE]"
        />
        <StatsCard
          title="Credit Status"
          value={dashboardStats.creditStatus.count}
          subtitle={`${dashboardStats.creditStatus.creditsMonthly} CREDITS MONTHLY`}
          icon={<CreditCard className="h-6 w-6 text-[#F97316]" />}
          iconBgColor="bg-[#FFEDD5]"
        />
      </div>

      {/* Usage Chart */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {/* Chart Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 underline decoration-2 underline-offset-4">
            Usage
          </h2>
          <div className="flex items-center gap-3">
            <Select value={selectedDeviceGroup} onValueChange={setSelectedDeviceGroup}>
              <SelectTrigger className="w-[180px] border-gray-200 bg-gray-50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {deviceGroups.map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-[100px] border-gray-200 bg-gray-50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select defaultValue="date-range">
              <SelectTrigger className="w-[140px] border-gray-200 bg-gray-50">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-range">Date Range</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={usageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis
                dataKey="hour"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748B", fontSize: 12 }}
                tickFormatter={(value) => value.toString()}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748B", fontSize: 12 }}
                ticks={[0, 50, 100, 150, 200]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1E293B",
                  border: "none",
                  borderRadius: "8px",
                  color: "white",
                }}
                labelFormatter={(value) => `${value}:00`}
                formatter={(value: number | undefined) => [value ?? 0, "Usage"]}
              />
              <ReferenceLine x={14} stroke="#64748B" strokeDasharray="3 3" />
              <Bar dataKey="value" fill="#2DD4BF" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Date Navigation */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateDate("prev")}
            className="text-gray-400 hover:text-gray-600"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <span className="text-sm font-medium text-gray-600">{formatDate(currentDate)}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateDate("next")}
            className="text-gray-400 hover:text-gray-600"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Hour Label */}
        <div className="mt-2 text-right text-xs text-gray-400">Hour</div>
      </div>

      {/* Recent Actions Table */}
      <div className="flex-1 rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900 underline decoration-2 underline-offset-4">
              Recent Actions
            </h2>
            {/* Live indicator */}
            <div className="flex items-center gap-1.5">
              <span
                className={`h-2 w-2 rounded-full ${
                  isLive ? "bg-green-500 animate-pulse" : "bg-gray-400"
                }`}
              />
              <span className="text-xs font-medium text-gray-500">
                {isLive ? "LIVE" : "PAUSED"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* New event notification badge */}
            <Button variant="outline" size="sm" className="relative" onClick={clearNewEvents}>
              <Bell className="h-4 w-4" />
              {newEventCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {newEventCount > 9 ? "9+" : newEventCount}
                </span>
              )}
            </Button>

            {/* Live toggle button */}
            <Button
              variant={isLive ? "default" : "outline"}
              size="sm"
              onClick={() => setIsLive(!isLive)}
              className={isLive ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {isLive ? "Pause" : "Resume"}
            </Button>
          </div>
        </div>
        <div className="h-[300px]">
          <AgGridReact
            theme={sentinelTheme}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            onGridReady={onGridReady}
            animateRows={true}
            rowHeight={48}
            headerHeight={44}
            rowClassRules={rowClassRules}
            getRowId={(params) => params.data.id}
          />
        </div>
      </div>
    </div>
  );
}
