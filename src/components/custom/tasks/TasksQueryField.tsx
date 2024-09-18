import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";

export const TasksQueryField = ({
  updateQuery,
}: {
  updateQuery: (query: string | undefined) => void;
}) => {
  const [query, setQuery] = useState<string | undefined>(undefined);
  const handleQueryChange = () => {
    updateQuery(query && query.length > 0 ? query : undefined);
  };

  return (
    <div className="flex flex-row w-72 relative">
      <Input
        placeholder="Search"
        className="flex w-full pl-2"
        onChange={(e) => setQuery(e.target.value)}
      />
      <IoSearch
        className="absolute right-2 top-1.5 h-6 w-6 text-sky-600"
        onClick={handleQueryChange}
      />
    </div>
  );
};
