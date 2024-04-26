import { Search } from "lucide-react";
import { Input } from "../_components/ui/input";

export default async function BookSearch() {
  return (
    <div className="flex justify-center mt-2">
      <div className="w-[500px]">
        <div className="relative">
            <Search className="stroke-bg-secondary absolute top-[11px] left-2" size={16}/>
            <Input className="px-8" placeholder="search books" type="text" />
        </div>
        <div className="grid mx-auto my-2 gap-4 grid-cols-4 max-w-max">
            <div className="w-24 h-36 bg-secondary rounded-md"></div>
            <div className="w-24 h-36 bg-secondary rounded-md"></div>
            <div className="w-24 h-36 bg-secondary rounded-md"></div>
            <div className="w-24 h-36 bg-secondary rounded-md"></div>
            <div className="w-24 h-36 bg-secondary rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
