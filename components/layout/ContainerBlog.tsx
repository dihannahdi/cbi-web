import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface ContainerBlogProps {
  children: ReactNode;
  className?: string;
}

const ContainerBlog: FC<ContainerBlogProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "mx-auto px-6 py-12 md:max-w-3xl lg:px-9 lg:py-20 xl:px-0",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ContainerBlog;
