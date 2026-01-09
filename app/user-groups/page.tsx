"use client";

import { useMemo, useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef, ICellRendererParams, themeQuartz } from "ag-grid-community";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockUserGroups, UserGroup } from "@/data/mock-user-groups";
import { Plus, MoreVertical, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

ModuleRegistry.registerModules([AllCommunityModule]);

// Status cell renderer
const StatusCellRenderer = (params: ICellRendererParams<UserGroup>) => {
  const status = params.value;
  if (!status) return null;

  const isActive = status === "Active";

  return (
    <Badge
      variant={isActive ? "default" : "secondary"}
      className={
        isActive
          ? "bg-green-100 text-green-700 hover:bg-green-100"
          : "bg-gray-100 text-gray-600 hover:bg-gray-100"
      }
    >
      {status}
    </Badge>
  );
};

// Member count cell renderer
const MemberCountCellRenderer = (params: ICellRendererParams<UserGroup>) => {
  const count = params.value;
  return (
    <div className="flex items-center gap-2">
      <Users className="h-4 w-4 text-gray-400" />
      <span>{count}</span>
    </div>
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

export default function UserGroupsPage() {
  const [rowData] = useState<UserGroup[]>(mockUserGroups);

  const columnDefs = useMemo<ColDef<UserGroup>[]>(
    () => [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        width: 50,
        pinned: "left",
      },
      {
        field: "name",
        headerName: "Group Name",
        width: 180,
        cellClass: "font-medium",
      },
      {
        field: "description",
        headerName: "Description",
        width: 280,
        cellClass: "text-gray-600",
      },
      {
        field: "memberCount",
        headerName: "Members",
        width: 120,
        cellRenderer: MemberCountCellRenderer,
      },
      {
        field: "accessLevel",
        headerName: "Access Level",
        width: 150,
      },
      {
        field: "createdAt",
        headerName: "Created Date",
        width: 140,
      },
      {
        field: "status",
        headerName: "Status",
        width: 120,
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
        <h1 className="text-2xl font-semibold text-gray-900">User Groups</h1>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuItem>Import</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg px-4 h-10">
            <Plus className="mr-2 h-4 w-4" />
            Add Group
          </Button>
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
