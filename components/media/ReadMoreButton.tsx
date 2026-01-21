import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ReadMoreButton = ({
  text = "Selengkapnya",
  link = "/",
}: {
  text?: string;
  link?: string;
}) => {
  return (
    <Link
      href={link}
      className="mt-6 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:text-[#009933] xl:text-base"
    >
      <span>{text}</span> <ArrowRight className="h-4 w-4" />
    </Link>
  );
};

export default ReadMoreButton;
