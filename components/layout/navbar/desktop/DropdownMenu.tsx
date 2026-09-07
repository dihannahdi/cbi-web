import { FC } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface DropdownLink {
  title: string;
  href: string;
  indent?: boolean;
}

interface DropdownProps {
  isOpen: boolean;
  links: DropdownLink[];
}

export const DropdownMenu: FC<DropdownProps> = ({ isOpen, links }) => (
  <div
    className={cn(
      "absolute top-12 z-20 mt-2 w-60 origin-top overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-lg transition-all duration-300 ease-out",
      isOpen
        ? "scale-100 opacity-100"
        : "pointer-events-none scale-95 opacity-0",
    )}
  >
    <div className="py-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "block py-2 text-sm text-stone-700 transition-colors hover:bg-green-50 hover:text-brand",
            link.indent ? "pl-8 pr-4 text-xs text-stone-500" : "px-4 font-medium",
          )}
        >
          {link.title}
        </Link>
      ))}
    </div>
  </div>
);
