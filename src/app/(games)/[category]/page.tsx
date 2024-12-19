import { type Category } from "@/types/types";
import { type GiveawaysCardProps } from "@/types/giveaways-types";
import { type DealsCardProps } from "@/types/deals-types";
import { type GamesCardProps } from "@/types/games-types";
import fetchData from "@/lib/fetch-data";
import QueryOptionsForm from "./query-options-form";
import DealsCard from "./deals-card";
import GiveawaysCard from "./giveaways-card";
import GamesCard from "./games-card";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ category: Category }>;
}) => {
  const { category } = await params;
  return {
    title: `${category.charAt(0).toUpperCase()}${category.slice(1)} | Next Level Loot`,
    description: `Check out the latest ${category} on Next Level Loot!`,
  };
};

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ category: Category }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category } = await params;
  const resolvedSearchParams = await searchParams;
  const { searchTerm, sort, order, ...filters } = resolvedSearchParams;

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
    deals: (data: DealsCardProps[]) =>
      data.map((deal) => <DealsCard key={deal.dealID} {...deal} />),
    giveaways: (data: GiveawaysCardProps[]) =>
      data.map((game) => <GiveawaysCard key={game.id} {...game} />),
    games: (data: { results: GamesCardProps[] }) =>
      data.results.map((game) => <GamesCard key={game.id} {...game} />),
  };

  const content = cards[category](data);

  return (
    <div className="container mx-auto mb-32 mt-8 space-y-16 px-4 xl:px-0">
      <QueryOptionsForm
        category={category}
        searchParams={resolvedSearchParams}
      />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {content}
      </div>
    </div>
  );
}
