import HighestRatedCard from "./highest-rated-card";

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

// interface Rating {
//   id: number;
//   title: string;
//   count: number;
//   percent: number;
// }

// interface AddedByStatus {
//   yet: number;
//   owned: number;
//   beaten: number;
//   toplay: number;
//   dropped: number;
//   playing: number;
// }

// interface Tag {
//   id: number;
//   name: string;
//   slug: string;
//   language: string;
//   games_count: number;
//   image_background: string;
// }

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

export interface HighestRatedGameType {
  // slug: string;
  name: string;
  // playtime: number;
  platforms: { platform: Platform }[];
  stores: { store: Store }[];
  released: string;
  // tba: boolean;
  background_image: string;
  // rating: number;
  // rating_top: number;
  // ratings: Rating[];
  // ratings_count: number;
  // reviews_text_count: number;
  // added: number;
  // added_by_status: AddedByStatus;
  metacritic: number;
  // suggestions_count: number;
  // updated: string;
  id: number;
  // score: null | number;
  // clip: null | string;
  // tags: Tag[];
  esrb_rating: EsrbRating;
  // user_game: null | string;
  // reviews_count: number;
  // saturated_color: string;
  // dominant_color: string;
  short_screenshots: Screenshot[];
  // parent_platforms: { platform: Platform }[];
  genres: Genre[];
}

export default async function HighestRated() {
  const rawgAPIKey = process.env.RAWG_API_KEY;

  if (!rawgAPIKey) {
    throw new Error("RAWG_API_KEY is not defined");
  }

  const response = await fetch(
    `https://api.rawg.io/api/games?key=${rawgAPIKey}&page_size=24&platforms=7,4,187,186&dates&metacritic&ordering=-metacritic`,
  );

  if (!response.ok) {
    throw new Error(
      `HTTP error! Status: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();
  const highestRatedGames: HighestRatedGameType[] = data.results;

  return (
    <>
      <h1 className="py-32 text-center text-4xl font-bold uppercase">
        Highest Rated
      </h1>
      <div className="mb-32 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
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
            <HighestRatedCard
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
