"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchResults() {
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

  interface SearchResult {
    slug: string;
    name: string;
    platforms: { platform: Platform }[];
    stores: { store: Store }[];
    released: string;
    background_image: string;
    metacritic: number;
    suggestions_count: number;
    id: number;
    esrb_rating: EsrbRating;
    short_screenshots: Screenshot[];
    genres: Genre[];
  }

  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState<SearchResult[]>([]);

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
            <Card key={id} className="rounded-xl border-neutral-700">
              <CardHeader>
                <CardDescription>
                  <img src={background_image} alt={name} />
                </CardDescription>
                <CardTitle>{name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Metacritic Score: {metacritic}</p>
                <p>Platforms:</p>
                <ul>
                  {platforms.map((p) => (
                    <li key={p.platform.id}>{p.platform.name}</li>
                  ))}
                </ul>
                <p>Stores:</p>
                <ul>
                  {stores ? (
                    stores.map((s) => <li key={s.store.id}>{s.store.name}</li>)
                  ) : (
                    <li>No stores available</li>
                  )}
                </ul>
                <p>Released: {released}</p>
                <p>
                  ESRB Rating: {esrb_rating ? esrb_rating.name : "Not Rated"}
                </p>
                <p>Genres:</p>
                <ul>
                  {genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
                <div>
                  <h3>Screenshots</h3>
                  <ul className="grid grid-cols-3 gap-4">
                    {short_screenshots.map((screenshot) => (
                      <li key={screenshot.id}>
                        <img
                          src={screenshot.image}
                          alt={`${name} screenshot`}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-neutral-500">Deals</Button>
              </CardFooter>
            </Card>
          ),
        )}
      </div>
    </>
  );
}
