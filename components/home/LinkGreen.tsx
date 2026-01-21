import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface LinkGreenProps {
  children: React.ReactNode;
  href: string;
  withArrow?: boolean;
  className?: string;
  target?: "_blank" | "_parent" | "_self" | "_top";
}

const LinkGreen = ({
  children,
  href,
  withArrow = true,
  className,
  target,
}: LinkGreenProps) => {
  return (
    <Link
      href={href}
      target={target}
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500/50 lg:text-base",
        className,
      )}
    >
      <span>{children}</span> {withArrow && <ArrowRight size={16} />}
    </Link>
  );
};

export default LinkGreen;
