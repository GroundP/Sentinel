"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Pencil, Download, Trash2 } from "lucide-react";
import {
  userGroups,
  accessLevels,
  floorLevels,
  credentialTypes,
  userStatuses,
  userTypes,
} from "@/data/mock-users";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Report {
  id: string;
  name: string;
  isActive?: boolean;
}

const savedReports: Report[] = [
  { id: "1", name: "Demo User Report", isActive: true },
  { id: "2", name: "Expired Mobile Users Report" },
  { id: "3", name: "Expired Users" },
];

export function ReportModal({ isOpen, onClose }: ReportModalProps) {
  const [reportName, setReportName] = useState("Demo User Report");
  const [userType, setUserType] = useState("All");
  const [userGroup, setUserGroup] = useState("All");
  const [credentialType, setCredentialType] = useState<string[]>(["Link Pass"]);
  const [accessLevel, setAccessLevel] = useState("All");
  const [userStatus, setUserStatus] = useState<string[]>(["Activated"]);
  const [floorLevel, setFloorLevel] = useState("All");

  const removeCredentialType = (type: string) => {
    setCredentialType((prev) => prev.filter((t) => t !== type));
  };

  const removeUserStatus = (status: string) => {
    setUserStatus((prev) => prev.filter((s) => s !== status));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px] p-0">
        <DialogHeader className="border-b border-gray-200 px-6 py-4">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Report Settings
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 py-4">
          {/* Name Field */}
          <div className="mb-5">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <Input
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              className="border-gray-200"
            />
          </div>

          {/* Filter Grid */}
          <div className="mb-5 grid grid-cols-2 gap-4">
            {/* User Type */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                User Type
              </label>
              <Select value={userType} onValueChange={setUserType}>
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  {userTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* User Group */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                User Group
              </label>
              <Select value={userGroup} onValueChange={setUserGroup}>
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder="Select user group" />
                </SelectTrigger>
                <SelectContent>
                  {userGroups.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Credential Type */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Credential Type
              </label>
              <div className="flex min-h-[40px] flex-wrap items-center gap-1.5 rounded-md border border-gray-200 px-3 py-2">
                {credentialType.map((type) => (
                  <Badge
                    key={type}
                    variant="secondary"
                    className="flex items-center gap-1 bg-[#3B82F6] text-white hover:bg-[#2563EB]"
                  >
                    {type}
                    <button
                      onClick={() => removeCredentialType(type)}
                      className="ml-1 rounded-full hover:bg-white/20"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                <Select
                  onValueChange={(value) => {
                    if (!credentialType.includes(value) && value !== "All") {
                      setCredentialType((prev) => [...prev, value]);
                    }
                  }}
                >
                  <SelectTrigger className="h-6 w-6 border-0 p-0 shadow-none focus:ring-0">
                    <span className="sr-only">Add credential type</span>
                  </SelectTrigger>
                  <SelectContent>
                    {credentialTypes.filter((t) => t !== "All").map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Access Level */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Access Level
              </label>
              <Select value={accessLevel} onValueChange={setAccessLevel}>
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder="Select access level" />
                </SelectTrigger>
                <SelectContent>
                  {accessLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* User Status */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                User Status
              </label>
              <div className="flex min-h-[40px] flex-wrap items-center gap-1.5 rounded-md border border-gray-200 px-3 py-2">
                {userStatus.map((status) => (
                  <Badge
                    key={status}
                    variant="secondary"
                    className="flex items-center gap-1 bg-[#3B82F6] text-white hover:bg-[#2563EB]"
                  >
                    {status}
                    <button
                      onClick={() => removeUserStatus(status)}
                      className="ml-1 rounded-full hover:bg-white/20"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                <Select
                  onValueChange={(value) => {
                    if (!userStatus.includes(value) && value !== "All") {
                      setUserStatus((prev) => [...prev, value]);
                    }
                  }}
                >
                  <SelectTrigger className="h-6 w-6 border-0 p-0 shadow-none focus:ring-0">
                    <span className="sr-only">Add user status</span>
                  </SelectTrigger>
                  <SelectContent>
                    {userStatuses.filter((s) => s !== "All").map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Floor Level */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Floor level
              </label>
              <Select value={floorLevel} onValueChange={setFloorLevel}>
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder="Select floor level" />
                </SelectTrigger>
                <SelectContent>
                  {floorLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mb-5 flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-200 text-gray-600"
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              className="border-gray-200 text-gray-700"
            >
              Edit Report
            </Button>
          </div>

          {/* Report List */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Report List
            </label>
            <ScrollArea className="h-[180px] rounded-md border border-gray-200">
              <div className="divide-y divide-gray-100">
                {savedReports.map((report) => (
                  <div
                    key={report.id}
                    className={`flex items-center justify-between px-4 py-3 transition-colors ${
                      report.isActive
                        ? "bg-[#3B82F6] text-white"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-sm font-medium">{report.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        className={`rounded p-1 transition-colors ${
                          report.isActive
                            ? "hover:bg-white/20"
                            : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        }`}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        className={`rounded p-1 transition-colors ${
                          report.isActive
                            ? "hover:bg-white/20"
                            : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        }`}
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        className={`rounded p-1 transition-colors ${
                          report.isActive
                            ? "hover:bg-white/20"
                            : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        }`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4">
          <Button
            onClick={onClose}
            className="w-full bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
