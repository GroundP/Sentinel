"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  CreditCard, 
  Calendar,
  Upload,
  X,
  Check,
  ChevronDown,
} from "lucide-react";
import {
  userGroups,
  accessLevels,
  credentialTypes,
  userTypes,
} from "@/data/mock-users";

interface AddUserSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (userData: UserFormData) => void;
}

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userType: string;
  userGroup: string[];
  accessLevel: string[];
  credentialTypes: string[];
  validFrom: string;
  validTo: string;
  employeeId: string;
  department: string;
}

// Multi-select component for the form
function FormMultiSelect({
  options,
  selected,
  onChange,
  placeholder,
}: {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div className="relative">
      <div
        className="flex min-h-[40px] cursor-pointer flex-wrap items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-2 transition-colors hover:border-gray-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length === 0 ? (
          <span className="text-sm text-gray-400">{placeholder}</span>
        ) : (
          <>
            {selected.slice(0, 2).map((item) => (
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
            {selected.length > 2 && (
              <Badge variant="secondary" className="bg-gray-200 text-gray-700">
                +{selected.length - 2}
              </Badge>
            )}
          </>
        )}
        <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-gray-400" />
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
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
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleOption(option);
                      }}
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
        </>
      )}
    </div>
  );
}

export function AddUserSheet({ isOpen, onClose, onSave }: AddUserSheetProps) {
  const [formData, setFormData] = useState<UserFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    userType: "Regular",
    userGroup: [],
    accessLevel: [],
    credentialTypes: [],
    validFrom: "",
    validTo: "",
    employeeId: "",
    department: "",
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleInputChange = (field: keyof UserFormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave?.(formData);
    onClose();
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      userType: "Regular",
      userGroup: [],
      accessLevel: [],
      credentialTypes: [],
      validFrom: "",
      validTo: "",
      employeeId: "",
      department: "",
    });
    setAvatarPreview(null);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-[540px] p-0 flex flex-col">
        <SheetHeader className="px-6 py-4 border-b border-gray-200">
          <SheetTitle className="text-xl font-semibold text-gray-900">Add New User</SheetTitle>
          <SheetDescription className="text-sm text-gray-500">
            Create a new user account with access credentials
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="py-6 space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-2 border-gray-200">
                <AvatarImage src={avatarPreview || undefined} />
                <AvatarFallback className="bg-gray-100 text-gray-400 text-2xl">
                  {formData.firstName?.[0]?.toUpperCase() || formData.lastName?.[0]?.toUpperCase() || (
                    <User className="h-8 w-8" />
                  )}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <label
                  htmlFor="avatar-upload"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <Upload className="h-4 w-4" />
                  Upload Photo
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <p className="mt-1 text-xs text-gray-400">JPG, PNG up to 2MB</p>
              </div>
            </div>

            <Separator />

            {/* Basic Information */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-gray-900 flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                Basic Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    placeholder="John"
                    className="border-gray-200"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    placeholder="Doe"
                    className="border-gray-200"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                Contact Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="john.doe@company.com"
                    className="border-gray-200"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="border-gray-200"
                  />
                </div>
              </div>
            </div>

            {/* Organization */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-gray-400" />
                Organization
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Employee ID
                  </label>
                  <Input
                    value={formData.employeeId}
                    onChange={(e) => handleInputChange("employeeId", e.target.value)}
                    placeholder="EMP-001234"
                    className="border-gray-200"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Department
                  </label>
                  <Input
                    value={formData.department}
                    onChange={(e) => handleInputChange("department", e.target.value)}
                    placeholder="Engineering"
                    className="border-gray-200"
                  />
                </div>
              </div>
            </div>

            {/* Access Configuration */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-gray-900 flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-gray-400" />
                Access Configuration
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      User Type <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={formData.userType}
                      onValueChange={(value) => handleInputChange("userType", value)}
                    >
                      <SelectTrigger className="border-gray-200">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {userTypes.filter((t) => t !== "All").map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      User Group
                    </label>
                    <FormMultiSelect
                      options={userGroups}
                      selected={formData.userGroup}
                      onChange={(value) => handleInputChange("userGroup", value)}
                      placeholder="Select groups"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Access Level
                    </label>
                    <FormMultiSelect
                      options={accessLevels}
                      selected={formData.accessLevel}
                      onChange={(value) => handleInputChange("accessLevel", value)}
                      placeholder="Select levels"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Credential Type
                    </label>
                    <FormMultiSelect
                      options={credentialTypes}
                      selected={formData.credentialTypes}
                      onChange={(value) => handleInputChange("credentialTypes", value)}
                      placeholder="Select credentials"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Validity Period */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                Validity Period
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Valid From
                  </label>
                  <Input
                    type="date"
                    value={formData.validFrom}
                    onChange={(e) => handleInputChange("validFrom", e.target.value)}
                    className="border-gray-200"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">Valid To</label>
                  <Input
                    type="date"
                    value={formData.validTo}
                    onChange={(e) => handleInputChange("validTo", e.target.value)}
                    className="border-gray-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className="border-t border-gray-200 px-6 py-4">
          <div className="flex w-full gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-200 text-gray-600"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-[#3B82F6] text-white hover:bg-[#2563EB]"
              disabled={!formData.firstName || !formData.lastName || !formData.email}
            >
              Create User
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
