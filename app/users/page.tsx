"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UsersTable } from "@/components/users/users-table";
import { ReportModal } from "@/components/users/report-modal";
import { AddUserSheet } from "@/components/users/add-user-sheet";
import { mockUsers } from "@/data/mock-users";
import {
  Plus,
  MoreVertical,
  Settings2,
  Download,
  Power,
  Trash2,
  Upload,
  Image as ImageIcon,
  Repeat,
  Ban,
  Lock,
  LayoutGrid,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UsersPage() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const handleSaveUser = (userData: unknown) => {
    console.log("New user data:", userData);
    // TODO: API call to save user
  };

  return (
    <div className="flex h-full flex-col">
      {/* Page Header */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
        <div className="flex items-center gap-2">
          {/* Add User Button */}
          <Button
            className="bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg px-4 h-10"
            onClick={() => setIsAddUserOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-start">
        {/* Menu Button */}
        {/* <DropdownMenu>
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
        </DropdownMenu> */}

        {/* Shutdown Button */}
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
          <Power className="h-5 w-5" />
        </Button>

        {/* Filter Button */}
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
          <Repeat className="h-5 w-5" />
        </Button>

        {/* Stop Button */}
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
          <Ban className="h-5 w-5" />
        </Button>

        {/* Trash Button */}
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
          <Trash2 className="h-5 w-5" />
        </Button>

        {/* Report Button */}
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-gray-700"
          onClick={() => setIsReportModalOpen(true)}
          title="Report"
        >
          <LayoutGrid className="h-5 w-5" />
        </Button>

        {/* Lock Button */}
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
          <Lock className="h-5 w-5" />
        </Button>

        <div className="h-6 mx-2 border-l-2 border-gray-350" />

        {/* Upload Button */}
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
          <Upload className="h-5 w-5" />
        </Button>

        {/* Download Button */}
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
          <Download className="h-5 w-5" />
        </Button>

        {/* Picture Button */}
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
          <ImageIcon className="h-5 w-5" />
        </Button>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <UsersTable users={mockUsers} />
      </div>

      {/* Report Modal */}
      <ReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />

      {/* Add User Sheet */}
      <AddUserSheet
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        onSave={handleSaveUser}
      />
    </div>
  );
}
