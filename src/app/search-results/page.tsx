"use client";

// TODO: Error boundary doesn't quite work as expected due to using useEffect to fetch data

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import ResultsList from "@/components/ui/results-list";
import SearchResultsCard from "./search-results-card";
import { SearchResultType } from "./types";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState<SearchResultType[]>([]);

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
      <ResultsList>
        {results.map((r) => (
          <SearchResultsCard
            key={r.id}
            name={r.name}
            platforms={r.platforms}
            stores={r.stores}
            released={r.released}
            background_image={r.background_image}
            metacritic={r.metacritic}
            id={r.id}
            esrb_rating={r.esrb_rating}
            short_screenshots={r.short_screenshots}
            genres={r.genres}
          />
        ))}
      </ResultsList>
    </>
  );
}
