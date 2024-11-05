"use server";

export default async function searchGames(slug: string) {
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

  const rawgAPIKey = process.env.RAWG_API_KEY;

  if (!rawgAPIKey) {
    throw new Error("No RAWG API key found");
  }

  const response = await fetch(
    `https://api.rawg.io/api/games?key=${rawgAPIKey}&search=${slug}&platforms=18,1,7`,
  );

  const { results } = await response.json();

  return results.map(
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
    }: SearchResult) => ({
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
    }),
  );
}
