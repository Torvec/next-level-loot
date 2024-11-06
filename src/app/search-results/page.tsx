"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import SearchResultsCard from "./search-results-card";

interface Platform {
  id: number;
  name: string;
  slug: string;
}

interface Store {
  id: number;
  name: string;
  slug: string;
}

interface EsrbRating {
  id: number;
  name: string;
  slug: string;
  name_en: string;
  name_ru: string;
}

interface Screenshot {
  id: number;
  image: string;
}

interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface SearchResultType {
  // slug: string;
  name: string;
  platforms: { platform: Platform }[];
  stores: { store: Store }[];
  released: string;
  background_image: string;
  metacritic: number;
  // suggestions_count: number;
  id: number;
  esrb_rating: EsrbRating;
  short_screenshots: Screenshot[];
  genres: Genre[];
}

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
      <div className="mb-32 grid grid-cols-3 gap-8">
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
