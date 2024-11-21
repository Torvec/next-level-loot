"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import ResultsList from "@/components/ui/results-list";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const searchQuery = Array.isArray(query) ? query[0] : query;
    if (searchQuery) {
      fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`)
        .then((res) => res.json())
        .then((data) => setResults(data));
    }
  }, [query]);

  return (
    <>
      <h1 className="py-32 text-center text-4xl font-bold uppercase">
        Search Results
      </h1>
      <ResultsList>{results}</ResultsList>
    </>
  );
}
