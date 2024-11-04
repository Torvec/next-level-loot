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
        <ul>
          {highestRatedGames.map((game) => (
            <li key={game.id}>
              <h2>{game.name}</h2>
              <img src={game.background_image} alt={game.name} />
              <p>Metacritic Score: {game.metacritic}</p>
              <p>
                Rating: {game.rating} ({game.rating_top})
              </p>
              <p>Released: {game.released}</p>
              <p>
                Platforms:{" "}
                {game.platforms.map((p) => p.platform.name).join(", ")}
              </p>
              <p>Genres: {game.genres.map((g) => g.name).join(", ")}</p>
            </li>
          ))}
        </ul>
      </>
    );
  } catch (error) {
    console.error("Error fetching free games:", error);
    return <div>Error loading free games.</div>;
  }
}
