"use client";

import { useMemo, useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef, ICellRendererParams, themeQuartz } from "ag-grid-community";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockDevices, Device } from "@/data/mock-devices";
import { Plus, MoreVertical, SlidersHorizontal, RefreshCw } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

ModuleRegistry.registerModules([AllCommunityModule]);

// Status cell renderer
const StatusCellRenderer = (params: ICellRendererParams<Device>) => {
  const status = params.value;
  if (!status) return null;

  const statusStyles: Record<string, string> = {
    Online: "bg-green-100 text-green-700",
    Offline: "bg-red-100 text-red-700",
    Maintenance: "bg-yellow-100 text-yellow-700",
  };

  return (
    <Badge variant="secondary" className={statusStyles[status] || "bg-gray-100 text-gray-700"}>
      <span
        className={`mr-1.5 inline-block h-2 w-2 rounded-full ${
          status === "Online"
            ? "bg-green-500"
            : status === "Offline"
            ? "bg-red-500"
            : "bg-yellow-500"
        }`}
      />
      {status}
    </Badge>
  );
};

// Device type cell renderer
const DeviceTypeCellRenderer = (params: ICellRendererParams<Device>) => {
  const type = params.value;
  if (!type) return null;

  const colorMap: Record<string, string> = {
    "Door Reader": "bg-blue-100 text-blue-700",
    "Face Scanner": "bg-purple-100 text-purple-700",
    Fingerprint: "bg-indigo-100 text-indigo-700",
    "Card Reader": "bg-cyan-100 text-cyan-700",
    Turnstile: "bg-teal-100 text-teal-700",
    "Elevator Controller": "bg-orange-100 text-orange-700",
  };

  return (
    <Badge variant="secondary" className={colorMap[type] || "bg-gray-100 text-gray-700"}>
      {type}
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

export default function DevicesPage() {
  const [rowData] = useState<Device[]>(mockDevices);

  const columnDefs = useMemo<ColDef<Device>[]>(
    () => [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        width: 50,
        pinned: "left",
      },
      {
        field: "name",
        headerName: "Device Name",
        width: 200,
        cellClass: "font-medium",
      },
      {
        field: "deviceType",
        headerName: "Type",
        width: 160,
        cellRenderer: DeviceTypeCellRenderer,
      },
      {
        field: "model",
        headerName: "Model",
        width: 140,
      },
      {
        field: "location",
        headerName: "Location",
        width: 150,
      },
      {
        field: "floor",
        headerName: "Floor",
        width: 100,
      },
      {
        field: "ipAddress",
        headerName: "IP Address",
        width: 140,
        cellClass: "font-mono text-sm",
      },
      {
        field: "lastSync",
        headerName: "Last Sync",
        width: 170,
      },
      {
        field: "status",
        headerName: "Status",
        width: 130,
        cellRenderer: StatusCellRenderer,
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

  const onGridReady = useCallback(() => {}, []);

  return (
    <div className="flex h-full flex-col">
      {/* Page Header */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Devices</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="text-gray-600">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync All
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuItem>Bulk Update</DropdownMenuItem>
              <DropdownMenuItem>Firmware Update</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
            <SlidersHorizontal className="h-5 w-5" />
          </Button>

          <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg px-4 h-10">
            <Plus className="mr-2 h-4 w-4" />
            Add Device
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-4 grid grid-cols-4 gap-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="text-sm text-gray-500">Total Devices</div>
          <div className="mt-1 text-2xl font-semibold text-gray-900">{mockDevices.length}</div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="text-sm text-gray-500">Online</div>
          <div className="mt-1 text-2xl font-semibold text-green-600">
            {mockDevices.filter((d) => d.status === "Online").length}
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="text-sm text-gray-500">Offline</div>
          <div className="mt-1 text-2xl font-semibold text-red-600">
            {mockDevices.filter((d) => d.status === "Offline").length}
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div className="text-sm text-gray-500">Maintenance</div>
          <div className="mt-1 text-2xl font-semibold text-yellow-600">
            {mockDevices.filter((d) => d.status === "Maintenance").length}
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <AgGridReact
          theme={sentinelTheme}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          animateRows={true}
          rowHeight={56}
          headerHeight={48}
        />
      </div>
    </div>
  );
}
