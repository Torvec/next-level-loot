import { type Category } from "@/types/types";
import { type GiveawaysCardProps } from "@/types/giveaways-types";
import { type DealsCardProps } from "@/types/deals-types";
import { type GamesCardProps } from "@/types/games-types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import fetchData from "@/lib/fetch-data";
import QueryOptionsForm from "./query-options-form";
import {
  DealsCardHeader,
  DealsCardContent,
  DealsCardFooter,
} from "./deals-card";
import {
  GiveawaysCardHeader,
  GiveawaysCardContent,
  GiveawaysCardFooter,
} from "./giveaways-card";
import {
  GamesCardHeader,
  GamesCardContent,
  GamesCardFooter,
} from "./games-card";

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
  // Next gets the current category from the params
  const { category } = await params;

  // Next gets the search params from the url
  const resolvedSearchParams = await searchParams;

  // Extract and process search parameters
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

  // Fetch data for the given category
  const fetchedData = await fetchData({
    category,
    searchTerm: searchString,
    selectedSort,
    selectedOrder,
    selectedFilters,
  });

  // Normalize the data for the games category
  const data =
    category === "games" && fetchedData.results
      ? fetchedData.results
      : fetchedData;

  // Handle no Results
  if (data.length === 0) {
    return (
      <div className="my-32">
        <h2 className="min-h-[50vh] place-content-center text-center font-bold">
          No Results found
        </h2>
      </div>
    );
  }

  // Map category to its respective card components
  const cardComponents = {
    deals: {
      Header: DealsCardHeader,
      Content: DealsCardContent,
      Footer: DealsCardFooter,
    },
    games: {
      Header: GamesCardHeader,
      Content: GamesCardContent,
      Footer: GamesCardFooter,
    },
    giveaways: {
      Header: GiveawaysCardHeader,
      Content: GiveawaysCardContent,
      Footer: GiveawaysCardFooter,
    },
  };
  const { Header, Content, Footer } = cardComponents[category];

  return (
    <div className="container mx-auto mb-32 mt-8 space-y-16 px-4 xl:px-0">
      <QueryOptionsForm
        category={category}
        searchParams={resolvedSearchParams}
      />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map(
          (itemData: DealsCardProps & GamesCardProps & GiveawaysCardProps) => (
            <Card
              key={itemData.id || itemData.dealID}
              className="flex flex-col justify-between rounded-xl border-0 bg-gradient-to-t from-muted to-muted/20"
            >
              <CardHeader>
                <Header {...itemData} />
              </CardHeader>
              <CardContent className="space-y-4">
                <Content {...itemData} />
              </CardContent>
              <CardFooter className="flex-col gap-4">
                <Footer {...itemData} />
              </CardFooter>
            </Card>
          ),
        )}
      </div>
    </div>
  );
}
