"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UsersTable } from "@/components/users/users-table";
import { ReportModal } from "@/components/users/report-modal";
import { mockUsers } from "@/data/mock-users";
import { Plus, MoreVertical, Settings2, Download, SlidersHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UsersPage() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <div className="flex h-full flex-col">
      {/* Page Header */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
        <div className="flex items-center gap-2">
          {/* Menu Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsReportModalOpen(true)}>
                <Settings2 className="mr-2 h-4 w-4" />
                Report Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Export
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Filter Button */}
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
            <SlidersHorizontal className="h-5 w-5" />
          </Button>

          {/* Add User Button */}
          <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg px-4 h-10">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <UsersTable users={mockUsers} />
      </div>

      {/* Report Modal */}
      <ReportModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
      />
    </div>
  );
}
