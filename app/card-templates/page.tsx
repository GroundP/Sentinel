"use client";

import { useMemo, useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  ColDef,
  ICellRendererParams,
  themeQuartz,
} from "ag-grid-community";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockCardTemplates, CardTemplate } from "@/data/mock-card-templates";
import { Plus, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

ModuleRegistry.registerModules([AllCommunityModule]);

// Status cell renderer
const StatusCellRenderer = (params: ICellRendererParams<CardTemplate>) => {
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

// Card type cell renderer
const CardTypeCellRenderer = (params: ICellRendererParams<CardTemplate>) => {
  const type = params.value;
  if (!type) return null;

  const colorMap: Record<string, string> = {
    Employee: "bg-blue-100 text-blue-700",
    Visitor: "bg-purple-100 text-purple-700",
    Contractor: "bg-orange-100 text-orange-700",
    VIP: "bg-yellow-100 text-yellow-700",
  };

  return (
    <Badge variant="secondary" className={colorMap[type] || "bg-gray-100 text-gray-700"}>
      {type}
    </Badge>
  );
};

// Access zones cell renderer
const AccessZonesCellRenderer = (params: ICellRendererParams<CardTemplate>) => {
  const zones = params.value as string[];
  if (!zones || zones.length === 0) return null;

  const displayZones = zones.slice(0, 2);
  const remaining = zones.length - 2;

  return (
    <div className="flex flex-wrap gap-1">
      {displayZones.map((zone) => (
        <span key={zone} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
          {zone}
        </span>
      ))}
      {remaining > 0 && (
        <span className="rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-600">+{remaining}</span>
      )}
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

export default function CardTemplatesPage() {
  const [rowData] = useState<CardTemplate[]>(mockCardTemplates);

  const columnDefs = useMemo<ColDef<CardTemplate>[]>(
    () => [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        width: 50,
        pinned: "left",
      },
      {
        field: "name",
        headerName: "Template Name",
        width: 200,
        cellClass: "font-medium",
      },
      {
        field: "cardType",
        headerName: "Card Type",
        width: 130,
        cellRenderer: CardTypeCellRenderer,
      },
      {
        field: "description",
        headerName: "Description",
        width: 250,
        cellClass: "text-gray-600",
      },
      {
        field: "validityPeriod",
        headerName: "Validity",
        width: 120,
      },
      {
        field: "accessZones",
        headerName: "Access Zones",
        width: 200,
        cellRenderer: AccessZonesCellRenderer,
      },
      {
        field: "usageCount",
        headerName: "Usage",
        width: 100,
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
        <h1 className="text-2xl font-semibold text-gray-900">Card Templates</h1>
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
            Add Template
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
