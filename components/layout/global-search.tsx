"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Users,
  Monitor,
  CreditCard,
  Building2,
  X,
  ArrowRight,
  Command,
} from "lucide-react";
import { mockUsers } from "@/data/mock-users";
import { mockDevices } from "@/data/mock-devices";
import { mockUserGroups } from "@/data/mock-user-groups";
import { mockCardTemplates } from "@/data/mock-card-templates";

interface SearchResult {
  id: string;
  type: "user" | "device" | "user-group" | "card-template";
  title: string;
  subtitle: string;
  href: string;
  icon: React.ReactNode;
  avatar?: string;
}

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Search function
  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const searchResults: SearchResult[] = [];

    // Search Users
    mockUsers
      .filter(
        (user) =>
          user.name.toLowerCase().includes(query) || user.visibleId.toLowerCase().includes(query)
      )
      .slice(0, 3)
      .forEach((user) => {
        searchResults.push({
          id: `user-${user.id}`,
          type: "user",
          title: user.name,
          subtitle: `${user.userType} • ${user.userGroup}`,
          href: "/users",
          icon: <Users className="h-4 w-4 text-blue-500" />,
          avatar: user.avatar,
        });
      });

    // Search Devices
    mockDevices
      .filter(
        (device) =>
          device.name.toLowerCase().includes(query) ||
          device.model.toLowerCase().includes(query) ||
          device.location.toLowerCase().includes(query) ||
          device.ipAddress.includes(query)
      )
      .slice(0, 3)
      .forEach((device) => {
        searchResults.push({
          id: `device-${device.id}`,
          type: "device",
          title: device.name,
          subtitle: `${device.deviceType} • ${device.location}`,
          href: "/devices",
          icon: <Monitor className="h-4 w-4 text-cyan-500" />,
        });
      });

    // Search User Groups
    mockUserGroups
      .filter(
        (group) =>
          group.name.toLowerCase().includes(query) ||
          group.description.toLowerCase().includes(query)
      )
      .slice(0, 2)
      .forEach((group) => {
        searchResults.push({
          id: `group-${group.id}`,
          type: "user-group",
          title: group.name,
          subtitle: `${group.memberCount} members • ${group.accessLevel}`,
          href: "/user-groups",
          icon: <Building2 className="h-4 w-4 text-purple-500" />,
        });
      });

    // Search Card Templates
    mockCardTemplates
      .filter(
        (template) =>
          template.name.toLowerCase().includes(query) ||
          template.cardType.toLowerCase().includes(query)
      )
      .slice(0, 2)
      .forEach((template) => {
        searchResults.push({
          id: `template-${template.id}`,
          type: "card-template",
          title: template.name,
          subtitle: `${template.cardType} • ${template.validityPeriod}`,
          href: "/card-templates",
          icon: <CreditCard className="h-4 w-4 text-orange-500" />,
        });
      });

    setResults(searchResults);
    setSelectedIndex(0);
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 200);

    return () => clearTimeout(timer);
  }, [query, performSearch]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 0);
      }

      // Escape to close
      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    }
  };

  // Handle result selection
  const handleSelect = (result: SearchResult) => {
    router.push(result.href);
    setIsOpen(false);
    setQuery("");
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Group results by type
  const groupedResults = results.reduce((acc, result) => {
    const type = result.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  const typeLabels: Record<string, string> = {
    user: "Users",
    device: "Devices",
    "user-group": "User Groups",
    "card-template": "Card Templates",
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-72 border-gray-200 bg-gray-50 pl-10 pr-20 focus:bg-white"
        />
        {/* Keyboard shortcut hint */}
        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
          {query ? (
            <button
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
              className="rounded p-0.5 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <kbd className="hidden items-center gap-1 rounded border border-gray-200 bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500 sm:flex">
              <Command className="h-3 w-3" />K
            </kbd>
          )}
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (query.length > 0 || results.length > 0) && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[400px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          {results.length > 0 ? (
            <ScrollArea className="max-h-[400px]">
              <div className="p-2">
                {Object.entries(groupedResults).map(([type, items]) => (
                  <div key={type} className="mb-2 last:mb-0">
                    <div className="mb-1 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      {typeLabels[type]}
                    </div>
                    {items.map((result, index) => {
                      const globalIndex = results.indexOf(result);
                      const isSelected = globalIndex === selectedIndex;

                      return (
                        <button
                          key={result.id}
                          onClick={() => handleSelect(result)}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                            isSelected ? "bg-blue-50" : "hover:bg-gray-50"
                          }`}
                        >
                          {/* Avatar or Icon */}
                          {result.avatar ? (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={result.avatar} />
                              <AvatarFallback className="bg-gray-200 text-xs">
                                {result.title
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                              {result.icon}
                            </div>
                          )}

                          {/* Content */}
                          <div className="flex-1 overflow-hidden">
                            <div className="truncate font-medium text-gray-900">{result.title}</div>
                            <div className="truncate text-sm text-gray-500">{result.subtitle}</div>
                          </div>

                          {/* Arrow */}
                          {isSelected && <ArrowRight className="h-4 w-4 text-blue-500" />}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : query.length > 0 ? (
            <div className="p-8 text-center">
              <Search className="mx-auto h-8 w-8 text-gray-300" />
              <p className="mt-2 text-sm text-gray-500">No results found for &quot;{query}&quot;</p>
              <p className="mt-1 text-xs text-gray-400">
                Try searching for users, devices, or groups
              </p>
            </div>
          ) : null}

          {/* Footer */}
          {results.length > 0 && (
            <div className="border-t border-gray-100 bg-gray-50 px-3 py-2">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <kbd className="rounded border border-gray-200 bg-white px-1.5 py-0.5">↑</kbd>
                  <kbd className="rounded border border-gray-200 bg-white px-1.5 py-0.5">↓</kbd>
                  <span>to navigate</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="rounded border border-gray-200 bg-white px-1.5 py-0.5">Enter</kbd>
                  <span>to select</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
