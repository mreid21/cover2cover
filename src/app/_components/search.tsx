"use client";
import { Search } from "lucide-react";
import { Input } from "../_components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

type SearchInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> & {
  debounce?: { duration: number };
  queryName?: string;
};
export default function SearchInput({ queryName = "q", debounce = {duration: 1000}, ...inputProps }: SearchInputProps) {
  const pathname = usePathname();
  const router = useRouter();

  const debouncedOnSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams();
    term ? params.set(queryName, term) : params.delete(queryName);
    router.replace(`${pathname}?${params.toString()}`);
  }, debounce.duration);

  return (
    <div className="relative">
      <Search
        className="stroke-bg-secondary absolute left-2 top-[11px]"
        size={16}
      />
      <Input
        onChange={(e) => debouncedOnSearch(e.target.value)}
        className="px-8"
        type="text"
        {...inputProps}
      />
    </div>
  );
}
