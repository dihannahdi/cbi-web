import { FC } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface DropdownProps {
  isOpen: boolean;
  links: { title: string; href: string }[];
}

export const DropdownMenu: FC<DropdownProps> = ({ isOpen, links }) => (
  <div
    className={cn(
      "absolute top-10 z-10 mt-2 w-48 origin-top transform rounded-md bg-[#FDFDFD33] backdrop-blur-md transition-all duration-300 ease-in-out",
      isOpen
        ? "scale-100 opacity-100 backdrop-blur-xl"
        : "pointer-events-none scale-95 opacity-0",
    )}
  >
    <div className="py-1">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="block px-4 py-2 text-sm hover:bg-white/10"
        >
          {link.title}
        </Link>
      ))}
    </div>
  </div>
);
