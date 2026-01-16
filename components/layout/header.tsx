"use client";

import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlobalSearch } from "./global-search";

interface HeaderProps {
  userName?: string;
}

export function Header({ userName = "Jisang" }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Greeting */}
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-medium text-gray-800">
          Hello, {userName}! <span className="ml-1">👋</span>
        </h1>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 text-gray-600">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>English</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>한국어</DropdownMenuItem>
            <DropdownMenuItem>日本語</DropdownMenuItem>
            <DropdownMenuItem>中文</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Help */}
        <Button variant="ghost" size="icon" className="text-gray-600">
          <HelpCircle className="h-5 w-5" />
        </Button>

        {/* Global Search */}
        <GlobalSearch />

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/avatar.png" alt={userName} />
                <AvatarFallback className="bg-[#1E3A5F] text-white">
                  {userName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Chat Button */}
        <Button
          size="icon"
          className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-[#1E3A5F] shadow-lg hover:bg-[#2A4A73]"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
}
