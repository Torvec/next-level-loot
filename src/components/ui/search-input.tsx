"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search-results?query=${encodeURIComponent(query)}`);
    }
  };
  return (
    <form onSubmit={handleSearch} className="relative">
      <Input
        type="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-xl bg-neutral-800 pr-10 text-neutral-400"
      />
      <Button
        type="submit"
        size="icon"
        className="absolute right-0 top-0 h-full rounded-r-xl bg-neutral-600"
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
}
