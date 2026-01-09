"use client";

import { useMemo, useCallback, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef, ICellRendererParams, themeQuartz } from "ag-grid-community";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "@/data/mock-users";
import { Filter } from "lucide-react";

ModuleRegistry.registerModules([AllCommunityModule]);

interface UsersTableProps {
  users: User[];
}

// Custom cell renderer for the name column with avatar
const NameCellRenderer = (params: ICellRendererParams<User>) => {
  const user = params.data;
  if (!user?.name) return null;
  
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
          {user.name.split(" ").map(n => n[0]).join("")}
        </AvatarFallback>
      </Avatar>
      <span className="font-medium text-gray-900">{user.name}</span>
    </div>
  );
};

// Custom cell renderer for status
const StatusCellRenderer = (params: ICellRendererParams<User>) => {
  const status = params.value;
  if (!status) return null;
  
  const isActive = status === "Active";
  
  return (
    <Badge 
      variant={isActive ? "default" : "secondary"}
      className={isActive ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-gray-100 text-gray-600 hover:bg-gray-100"}
    >
      {status}
    </Badge>
  );
};

// Custom header component with filter icon
const CustomHeader = (props: { displayName: string }) => {
  return (
    <div className="flex items-center gap-2">
      <span>{props.displayName}</span>
      <Filter className="h-3 w-3 text-gray-400" />
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

export function UsersTable({ users }: UsersTableProps) {
  const [rowData] = useState<User[]>(users);

  const columnDefs = useMemo<ColDef<User>[]>(() => [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      width: 50,
      pinned: "left",
      headerClass: "ag-header-checkbox",
    },
    {
      field: "userType",
      headerName: "User Type",
      width: 120,
      headerComponent: CustomHeader,
      headerComponentParams: { displayName: "User Type" },
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      cellRenderer: NameCellRenderer,
    },
    {
      field: "visibleId",
      headerName: "ID",
      width: 120,
    },
    {
      field: "credentialType",
      headerName: "Credential Type",
      width: 180,
      headerComponent: CustomHeader,
      headerComponentParams: { displayName: "Credential Type" },
    },
    {
      headerName: "Valid Period",
      width: 180,
      valueGetter: (params) => {
        const start = params.data?.validPeriodStart;
        const end = params.data?.validPeriodEnd;
        if (!start) return "";
        return end ? `${start} - ${end}` : start;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      cellRenderer: StatusCellRenderer,
    },
    {
      field: "userGroup",
      headerName: "User Group",
      width: 180,
      headerComponent: CustomHeader,
      headerComponentParams: { displayName: "User Group" },
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      width: 150,
      headerComponent: CustomHeader,
      headerComponentParams: { displayName: "Access Level" },
    },
    {
      field: "floorLevel",
      headerName: "Floor level",
      width: 150,
      headerComponent: CustomHeader,
      headerComponentParams: { displayName: "Floor level" },
    },
  ], []);

  const defaultColDef = useMemo<ColDef>(() => ({
    sortable: true,
    resizable: true,
  }), []);

  const onGridReady = useCallback(() => {
    // Grid ready callback
  }, []);

  return (
    <div className="h-full w-full">
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
  );
}
