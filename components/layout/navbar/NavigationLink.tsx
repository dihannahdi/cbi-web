// components/navigation/NavigationLink.tsx
import { FC } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface NavigationLinkProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}

export const NavigationLink: FC<NavigationLinkProps> = ({
  href,
  isActive,
  children,
}) => (
  <Link
    href={href}
    className={cn(
      "text-base font-normal underline-offset-4 hover:underline",
      isActive && "font-bold underline underline-offset-4",
    )}
  >
    {children}
  </Link>
);
