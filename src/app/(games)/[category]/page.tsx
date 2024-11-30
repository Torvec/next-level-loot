import {
  type FreeGameType,
  type BestDealsType,
  type HighestRatedGameType,
  type Category,
} from "@/lib/types";
import fetchData from "@/lib/fetch-data";
import ResultsForm from "@/components/ui/results-form";
import ResultsList from "@/components/ui/results-list";
import BestDealsCard from "@/components/best-deals/best-deals-card";
import FreeGamesCard from "@/components/free-games/free-games-card";
import HighestRatedGamesCard from "@/components/highest-rated/highest-rated-games-card";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ category: Category }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category } = await params;
  const { searchTerm, sort, order, ...filters } = await searchParams;

  const searchString = Array.isArray(searchTerm)
    ? searchTerm.join(",")
    : searchTerm || "";

  const selectedSort = Array.isArray(sort) ? sort[0] : sort || "";

  const selectedOrder = Array.isArray(order) ? order[0] : order || "";

  const selectedFilters: Record<string, string[]> = Object.fromEntries(
    Object.entries(filters).map(([key, value]) => [
      key,
      (Array.isArray(value) ? value : [value]).filter(
        (v): v is string => v !== undefined,
      ),
    ]),
  );

  const data = await fetchData({
    category,
    searchTerm: searchString,
    selectedSort,
    selectedOrder,
    selectedFilters,
  });

  if (data.length === 0) {
    return (
      <div className="my-32">
        <h2 className="min-h-[50vh] place-content-center text-center font-bold">
          No Results found for
          <br /> {searchString}
        </h2>
      </div>
    );
  }

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
    <div className="mb-32 mt-8 space-y-16">
      <ResultsForm category={category} />
      <ResultsList>{content}</ResultsList>
    </div>
  );
}
