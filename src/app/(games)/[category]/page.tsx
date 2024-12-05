import {
  type DealsListType,
  type GamesListType,
  type GiveawaysListType,
  type Category,
} from "@/lib/types";
import fetchData from "@/lib/fetch-data";
import ResultsForm from "@/components/ui/results-form";
import ResultsList from "@/components/ui/results-list";
import DealsCard from "@/components/ui/cards/deals-card";
import GiveawaysCard from "@/components/ui/cards/giveaways-card";
import GamesCard from "@/components/ui/cards/games-card";

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
          No Results found
        </h2>
      </div>
    );
  }

  const cards = {
    deals: (data: DealsListType[]) =>
      data.map((deal) => <DealsCard key={deal.dealID} {...deal} />),
    giveaways: (data: GiveawaysListType[]) =>
      data.map((game) => <GiveawaysCard key={game.id} {...game} />),
    games: (data: { results: GamesListType[] }) =>
      data.results.map((game) => <GamesCard key={game.id} {...game} />),
  };

  const content = cards[category](data);

  return (
    <div className="mb-32 mt-8 space-y-16">
      <ResultsForm category={category} searchParams={searchParams} />
      <ResultsList>{content}</ResultsList>
    </div>
  );
}
