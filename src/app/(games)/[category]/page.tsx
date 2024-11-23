import {
  FreeGameType,
  GameDealType,
  HighestRatedGameType,
  Category,
} from "./types";
import ResultsList from "@/components/ui/results-list";
import BestDealsCard from "./components/best-deals-card";
import FreeGamesCard from "./components/free-games-card";
import HighestRatedGamesCard from "./components/highest-rated-games-card";
import { fetchList } from "@/lib/fetch";

type DataType =
  | ((data: GameDealType[]) => JSX.Element[])
  | ((data: FreeGameType[]) => JSX.Element[])
  | ((data: { results: HighestRatedGameType[] }) => JSX.Element[]);

export default async function Page(props: {
  params: Promise<{ category: Category }>;
}) {
  const { category } = await props.params;

  const data = await fetchList(category);

  const categoryComponents: Record<Category, DataType> = {
    "best-deals": (data: GameDealType[]) =>
      data.map((deal) => <BestDealsCard key={deal.dealID} {...deal} />),
    "free-games": (data: FreeGameType[]) =>
      data.map((game) => <FreeGamesCard key={game.id} {...game} />),
    "highest-rated": (data: { results: HighestRatedGameType[] }) =>
      data.results.map((game) => (
        <HighestRatedGamesCard key={game.id} {...game} />
      )),
  };

  const content = categoryComponents[category](data);

  return <ResultsList>{content}</ResultsList>;
}
