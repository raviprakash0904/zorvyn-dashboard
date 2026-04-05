"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ArrowLeftRight, Lightbulb } from "lucide-react";

const navLinks = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Transactions", href: "/transactions", icon: ArrowLeftRight },
  { name: "Insights", href: "/insights", icon: Lightbulb },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-card hidden md:flex flex-col z-10 shadow-sm">
      <div className="h-16 flex items-center px-6 border-b">
      <div className="flex items-center gap-3 group cursor-pointer">
  
  <div className="flex items-center h-16 border-b px-6">
  
  <div className="flex items-baseline leading-none gap-2 cursor-pointer group">
    
    
    <span className="text-4xl font-medium tracking-tight text-gray-300 transition-all duration-300 ease-out group-hover:text-gray-100 group-hover:scale-105 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
      zorvyn
    </span>
    
    <span className="text-[8px] relative top-[0.6rem] left-[-2.3rem] font-medium text-gray-500 tracking-wider">
      fintech
    </span>
    
  </div>
</div>
</div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-primary-foreground" : ""}`} />
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}