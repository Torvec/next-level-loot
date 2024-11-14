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
import { fetchData } from "./fetch";

export default async function Page(props: {
  params: Promise<{ category: Category }>;
}) {
  const { category } = await props.params;

  const fetchList = async (category: Category) => {
    const { baseURL, apiKey, headers, fetchEndPoints } = fetchData[category];
    const endpoint = fetchEndPoints.default;
    const url = `${baseURL}${endpoint}${apiKey ? `&${apiKey}` : ""}`;
    const response = await fetch(url, headers ?? undefined);
    if (!response.ok) {
      throw new Error(
        `HTTP error! Status: ${response.status} ${response.statusText}`,
      );
    }
    return response.json();
  };

  const data = await fetchList(category);

  const categoryComponents = {
    "best-deals": (data: GameDealType[]) =>
      data.map((deal) => <BestDealsCard key={deal.dealID} {...deal} />),
    "free-games": (data: FreeGameType[]) =>
      data.map((game) => <FreeGamesCard key={game.id} {...game} />),
    "highest-rated": (data: { results: HighestRatedGameType[] }) =>
      data.results.map((game) => (
        <HighestRatedGamesCard key={game.id} {...game} />
      )),
  };
  const content =
    categoryComponents[category as keyof typeof categoryComponents](data);

  return <ResultsList>{content}</ResultsList>;
}
