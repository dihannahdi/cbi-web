import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface LinkGreenProps {
  children: React.ReactNode;
  href: string;
  withArrow?: boolean;
  className?: string;
  target?: "_blank" | "_parent" | "_self" | "_top";
  /**
   * Visual weight of the CTA:
   * - `primary` (default) — forest-green pill, the site-wide primary action.
   * - `accent` — leaf-lime pill for high-energy / conversion moments (hero).
   */
  variant?: "primary" | "accent";
}

const variantStyles: Record<NonNullable<LinkGreenProps["variant"]>, string> = {
  primary: "bg-brand text-white hover:bg-brand-hover",
  accent: "bg-lime-500 font-semibold text-green-900 hover:bg-lime-600",
};

const LinkGreen = ({
  children,
  href,
  withArrow = true,
  className,
  target,
  variant = "primary",
}: LinkGreenProps) => {
  return (
    <Link
      href={href}
      target={target}
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50 lg:text-base",
        variantStyles[variant],
        className,
      )}
    >
      <span>{children}</span> {withArrow && <ArrowRight size={16} />}
    </Link>
  );
};

export default LinkGreen;
