"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  navItems: {
    name: string;
    href: string;
  }[];
}

export function MobileNav({ navItems }: MobileNavProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false;
    return pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      <Link href="/" className="flex items-center gap-2 px-4 py-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-6 h-6 text-primary"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path d="M20 6v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" />
          <path d="M17 14h-5" />
          <path d="M17 10h-5" />
          <path d="M8 22H6a2 2 0 0 1-2-2V9" />
        </svg>
        <span className="font-semibold text-xl">DocSign</span>
      </Link>
      <nav className="flex flex-col">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
              isActive(item.href)
                ? "text-primary bg-secondary"
                : "text-muted-foreground"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}