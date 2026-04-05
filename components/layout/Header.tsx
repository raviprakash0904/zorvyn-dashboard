"use client";

import { useTheme } from "next-themes";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Moon, Sun, ShieldAlert, ShieldCheck } from "lucide-react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { role, setRole } = useStore();

  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-6 z-10">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold hidden sm:block">Overview</h1>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Role Toggle Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setRole(role === "ADMIN" ? "VIEWER" : "ADMIN")}
          className="gap-2 font-medium"
        >
          {role === "ADMIN" ? (
            <ShieldCheck className="h-4 w-4 text-green-500" />
          ) : (
            <ShieldAlert className="h-4 w-4 text-amber-500" />
          )}
          Role: {role}
        </Button>

        {/* Theme Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  );
}