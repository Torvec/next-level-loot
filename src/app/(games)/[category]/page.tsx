/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FreeGameType,
  GameDealType,
  HighestRatedGameType,
  Category,
} from "./types";
import ResultsList from "@/components/ui/results-list";
import BestDealsCard from "./best-deals-card";
import FreeGamesCard from "./free-games-card";
import HighestRatedGamesCard from "./highest-rated-games-card";
import { initFetch } from "./fetch";

export default async function Page(props: {
  params: Promise<{ category: Category }>;
}) {
  const { category } = await props.params;
  const urlDecoded = decodeURIComponent(category);
  const data = await initFetch(urlDecoded as Category);

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
