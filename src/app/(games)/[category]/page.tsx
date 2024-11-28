import {
  type FreeGameType,
  type BestDealsType,
  type HighestRatedGameType,
  type Category,
} from "@/lib/types";
import ResultsForm from "@/components/ui/results-form";
import ResultsList from "@/components/ui/results-list";
import BestDealsCard from "@/components/best-deals/best-deals-card";
import FreeGamesCard from "@/components/free-games/free-games-card";
import HighestRatedGamesCard from "@/components/highest-rated/highest-rated-games-card";
import { fetchList } from "@/lib/fetch";

export default async function Page(props: {
  params: Promise<{ category: Category }>;
}) {
  const { category } = await props.params;

  const data = await fetchList(category);

  const cards = {
    "best-deals": (data: BestDealsType[]) =>
      data.map((deal) => <BestDealsCard key={deal.dealID} {...deal} />),

    "free-games": (data: FreeGameType[]) =>
      data.map((game) => <FreeGamesCard key={game.id} {...game} />),

    "highest-rated": (data: { results: HighestRatedGameType[] }) =>
      data.results.map((game) => (
        <HighestRatedGamesCard key={game.id} {...game} />
      )),
  };

  const content = cards[category](data);

  return (
    <div className="my-16 space-y-16">
      <ResultsForm category={category} />
      <ResultsList>{content}</ResultsList>
    </div>
  );
}
