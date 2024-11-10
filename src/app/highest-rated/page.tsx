import HighestRatedCard from "./highest-rated-card";
import { HighestRatedGameType } from "./types";

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
