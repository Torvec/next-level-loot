/* eslint-disable @typescript-eslint/no-explicit-any */
import { FreeGameType, GameDealType, HighestRatedGameType } from "./types";
import ResultsList from "@/components/ui/results-list";
import BestDealsCard from "./best-deals-card";
import FreeGamesCard from "./free-games-card";
import HighestRatedGamesCard from "./highest-rated-games-card";

export default async function Page(props: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await props.params;
  const urlDecoded = decodeURIComponent(category) as keyof typeof fetchURL;

  const rapidAPIKey = process.env.RAPIDAPI_KEY;
  if (!rapidAPIKey) {
    throw new Error("RAPIDAPI_KEY is not defined");
  }
  const rapidApiHeaders = {
    headers: {
      "X-RapidAPI-Key": rapidAPIKey,
      "X-RapidAPI-Host": "gamerpower.p.rapidapi.com",
    },
  };

  const rawgAPIKey = process.env.RAWG_API_KEY;
  if (!rawgAPIKey) {
    throw new Error("RAWG_API_KEY is not defined");
  }

  const fetchURL = {
    "best-deals": "https://www.cheapshark.com/api/1.0/deals",
    "free-games": "https://gamerpower.p.rapidapi.com/api/giveaways?sort=value",
    "highest-rated": `https://api.rawg.io/api/games?key=${rawgAPIKey}&page_size=24&platforms=7,4,187,186&dates&metacritic&ordering=-metacritic`,
  };

  let response;
  if (urlDecoded === "free-games") {
    response = await fetch(fetchURL[urlDecoded], rapidApiHeaders);
  } else {
    response = await fetch(fetchURL[urlDecoded]);
  }

  if (!response.ok) {
    throw new Error(
      `HTTP error! Status: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();

  return (
    <ResultsList>
      {urlDecoded === "best-deals" &&
        data.map((deal: GameDealType) => (
          <BestDealsCard key={deal.dealID} {...deal} />
        ))}
      {urlDecoded === "free-games" &&
        data.map((game: FreeGameType) => (
          <FreeGamesCard key={game.id} {...game} />
        ))}
      {urlDecoded === "highest-rated" &&
        data.results.map((game: HighestRatedGameType) => (
          <HighestRatedGamesCard key={game.id} {...game} />
        ))}
    </ResultsList>
  );
}
