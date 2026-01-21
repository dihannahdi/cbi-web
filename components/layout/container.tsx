import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const ContainerSection: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "mx-auto px-6 py-12 lg:max-w-7xl lg:px-9 lg:py-20 xl:px-0",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ContainerSection;
