"use client";

import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import { X, Pencil, Download, Trash2, ChevronDown, Check, Plus } from "lucide-react";
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
  { id: "1", name: "Demo User Report" },
  { id: "2", name: "Expired Mobile Users Report" },
  { id: "3", name: "Expired Users" },
];

// Multi-select dropdown component
interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  maxDisplayItems?: number;
}

function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select...",
  maxDisplayItems = 2,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter out "All" from options
  const filteredOptions = options.filter((opt) => opt !== "All");

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const removeOption = (option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selected.filter((s) => s !== option));
  };

  const removeAllOptions = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayItems = selected.slice(0, maxDisplayItems);
  const remainingCount = selected.length - maxDisplayItems;

  return (
    <div className="relative" ref={containerRef}>
      <div
        className="flex min-h-[40px] cursor-pointer flex-wrap items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-2 transition-colors hover:border-gray-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length === 0 ? (
          <span className="text-sm text-gray-400">{placeholder}</span>
        ) : (
          <>
            {displayItems.map((item) => (
              <Badge
                key={item}
                variant="secondary"
                className="flex items-center gap-1 bg-[#3B82F6] text-white hover:bg-[#2563EB]"
              >
                {item}
                <button
                  onClick={(e) => removeOption(item, e)}
                  className="ml-0.5 rounded-full hover:bg-white/20"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {remainingCount > 0 && (
              <Badge variant="secondary" className="bg-gray-200 text-gray-700 hover:bg-gray-300">
                +{remainingCount}
              </Badge>
            )}
            <button
              onClick={(e) => removeAllOptions(e)}
              className="h-4 w-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        )}

        <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-gray-400" />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
          <ScrollArea className="max-h-[200px]">
            <div className="p-1">
              {filteredOptions.map((option) => {
                const isSelected = selected.includes(option);
                return (
                  <div
                    key={option}
                    className={`flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors ${
                      isSelected ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100"
                    }`}
                    onClick={() => toggleOption(option)}
                  >
                    <div
                      className={`flex h-4 w-4 items-center justify-center rounded border ${
                        isSelected ? "border-[#3B82F6] bg-[#3B82F6]" : "border-gray-300"
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span>{option}</span>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}

export function ReportModal({ isOpen, onClose }: ReportModalProps) {
  const [reportName, setReportName] = useState("");
  const [userType, setUserType] = useState("All");
  const [userGroup, setUserGroup] = useState<string[]>([]);
  const [credentialType, setCredentialType] = useState<string[]>([]);
  const [accessLevel, setAccessLevel] = useState<string[]>([]);
  const [userStatus, setUserStatus] = useState<string[]>([]);
  const [floorLevel, setFloorLevel] = useState<string[]>([]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] p-0">
        <DialogHeader className="border-b border-gray-200 px-6 py-4">
          <DialogTitle className="text-lg font-semibold text-gray-900">Report Settings</DialogTitle>
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
              placeholder="Enter report name"
              className="border-gray-200"
            />
          </div>

          {/* Filter Grid */}
          <div className="mb-5 grid grid-cols-2 gap-x-6 gap-y-4">
            {/* User Type */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">User Type</label>
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

            {/* User Group - Multi-select */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">User Group</label>
              <MultiSelect
                options={userGroups}
                selected={userGroup}
                onChange={setUserGroup}
                placeholder="All"
                maxDisplayItems={2}
              />
            </div>

            {/* Credential Type - Multi-select */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Credential Type
              </label>
              <MultiSelect
                options={credentialTypes}
                selected={credentialType}
                onChange={setCredentialType}
                placeholder="All"
                maxDisplayItems={2}
              />
            </div>

            {/* Access Level - Multi-select */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Access Level</label>
              <MultiSelect
                options={accessLevels}
                selected={accessLevel}
                onChange={setAccessLevel}
                placeholder="All"
                maxDisplayItems={2}
              />
            </div>

            {/* User Status - Multi-select */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">User Status</label>
              <MultiSelect
                options={userStatuses}
                selected={userStatus}
                onChange={setUserStatus}
                placeholder="All"
                maxDisplayItems={2}
              />
            </div>

            {/* Floor Level - Multi-select */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Floor level</label>
              <MultiSelect
                options={floorLevels}
                selected={floorLevel}
                onChange={setFloorLevel}
                placeholder="All"
                maxDisplayItems={3}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mb-5 flex gap-3">
            <Button variant="outline" className="border-gray-200 text-gray-600">
              <Plus className="h-4 w-4" />
              Add Report
            </Button>
          </div>

          {/* Report List */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Report List</label>
            <ScrollArea className="h-[180px] rounded-md border border-gray-200">
              <div className="divide-y divide-gray-100">
                {savedReports.map((report) => (
                  <div
                    key={report.id}
                    className={`flex items-center justify-between px-4 py-3 transition-colors ${
                      report.isActive ? "bg-[#3B82F6] text-white" : "hover:bg-gray-50"
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
