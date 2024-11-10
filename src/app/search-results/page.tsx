"use client";

// TODO: Error boundary doesn't quite work as expected due to using useEffect to fetch data

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
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
      <div className="mb-32 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {results.map(
          ({
            name,
            platforms,
            stores,
            released,
            background_image,
            metacritic,
            id,
            esrb_rating,
            short_screenshots,
            genres,
          }) => (
            <SearchResultsCard
              key={id}
              name={name}
              platforms={platforms}
              stores={stores}
              released={released}
              background_image={background_image}
              metacritic={metacritic}
              id={id}
              esrb_rating={esrb_rating}
              short_screenshots={short_screenshots}
              genres={genres}
            />
          ),
        )}
      </div>
    </>
  );
}
