import { FC } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NavigationLink } from "@/components/layout/navbar/NavigationLink";

interface NavLinkType {
  title: string;
  href: string;
}

interface AccordionMenuProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  links: NavLinkType[];
  currentPath: string;
  href?: string;
}

export const AccordionMenu: FC<AccordionMenuProps> = ({
  title,
  isOpen,
  onToggle,
  links,
  currentPath,
  href,
}) => (
  <div>
    <div className="flex items-center gap-x-1">
      {href ? (
        <NavigationLink href={href} isActive={currentPath === href}>
          {title}
        </NavigationLink>
      ) : (
        <Button
          onClick={onToggle}
          variant="link"
          className={cn(
            "p-0 text-base font-normal text-[#FDFDFD] [&_svg]:size-5",
          )}
        >
          {title}
        </Button>
      )}
      <Button
        variant="link"
        onClick={onToggle}
        className={cn(
          "transform p-0 transition-transform duration-500 ease-in-out",
          isOpen && "rotate-180",
        )}
      >
        <ChevronDown className="h-5 w-5 text-white" />
      </Button>
    </div>
    <div
      className={cn(
        "flex flex-col gap-y-3 pl-2 transition-all duration-500 ease-in-out",
        isOpen
          ? "visible mt-3 max-h-40 opacity-100"
          : "collapse mt-0 max-h-0 opacity-0",
      )}
    >
      {links.map((link) => (
        <NavigationLink
          key={link.href}
          href={link.href}
          isActive={currentPath === link.href}
        >
          {link.title}
        </NavigationLink>
      ))}
    </div>
  </div>
);
