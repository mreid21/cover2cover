import { Search } from "lucide-react";
import { Input } from "../_components/ui/input";

export default function SearchInput() {
  return (
    <div className="relative">
      <Search
        className="stroke-bg-secondary absolute left-2 top-[11px]"
        size={16}
      />
      <Input className="px-8" placeholder="search books" type="text" />
    </div>
  );
}
