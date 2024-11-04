import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function HighestRated() {
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

  interface Rating {
    id: number;
    title: string;
    count: number;
    percent: number;
  }

  interface AddedByStatus {
    yet: number;
    owned: number;
    beaten: number;
    toplay: number;
    dropped: number;
    playing: number;
  }

  interface Tag {
    id: number;
    name: string;
    slug: string;
    language: string;
    games_count: number;
    image_background: string;
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

  // interface ParentPlatform {
  //   platform: Platform;
  // }

  interface Genre {
    id: number;
    name: string;
    slug: string;
  }

  interface HighestRatedGame {
    slug: string;
    name: string;
    playtime: number;
    platforms: { platform: Platform }[];
    stores: { store: Store }[];
    released: string;
    tba: boolean;
    background_image: string;
    rating: number;
    rating_top: number;
    ratings: Rating[];
    ratings_count: number;
    reviews_text_count: number;
    added: number;
    added_by_status: AddedByStatus;
    metacritic: number;
    suggestions_count: number;
    updated: string;
    id: number;
    score: null | number;
    clip: null | string;
    tags: Tag[];
    esrb_rating: EsrbRating;
    user_game: null | string;
    reviews_count: number;
    saturated_color: string;
    dominant_color: string;
    short_screenshots: Screenshot[];
    parent_platforms: { platform: Platform }[];
    genres: Genre[];
  }

  try {
    const rawgAPIKey = process.env.RAWG_API_KEY;

    if (!rawgAPIKey) {
      throw new Error("RAWG_API_KEY is not defined");
    }

    const response = await fetch(
      `https://api.rawg.io/api/games?key=${rawgAPIKey}&page_size=25&platforms=7,4,187,186&dates&metacritic&ordering=-metacritic`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const highestRatedGames: HighestRatedGame[] = data.results;

    return (
      <>
        <h1 className="py-32 text-center text-4xl font-bold uppercase">
          Highest Rated
        </h1>
        <div className="mb-32 grid grid-cols-3 gap-8">
          {highestRatedGames.map(
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
                      stores.map((s) => (
                        <li key={s.store.id}>{s.store.name}</li>
                      ))
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
  } catch (error) {
    console.error("Error fetching free games:", error);
    return <div>Error loading free games.</div>;
  }
}
