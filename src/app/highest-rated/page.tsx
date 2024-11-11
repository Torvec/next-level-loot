import ResultsList from "@/components/ui/results-list";
import HighestRatedGamesCard from "./highest-rated-games-card";
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
      <ResultsList>
        {highestRatedGames.map((hrg) => (
          <HighestRatedGamesCard
            key={hrg.id}
            name={hrg.name}
            platforms={hrg.platforms}
            stores={hrg.stores}
            released={hrg.released}
            background_image={hrg.background_image}
            metacritic={hrg.metacritic}
            id={hrg.id}
            esrb_rating={hrg.esrb_rating}
            short_screenshots={hrg.short_screenshots}
            genres={hrg.genres}
          />
        ))}
      </ResultsList>
    </>
  );
}
