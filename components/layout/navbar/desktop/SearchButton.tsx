// components/navigation/SearchButton.tsx
import { FC } from "react";
import { Search } from "lucide-react";

export const SearchButton: FC = () => (
  <button aria-label="Search" className="transition-transform hover:scale-105">
    <Search className="h-6 w-6" />
  </button>
);
