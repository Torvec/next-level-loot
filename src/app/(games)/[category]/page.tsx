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
import { query } from "@/lib/query";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ category: Category }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category } = await params;
  const { searchTerm } = await searchParams;

  const searchString = Array.isArray(searchTerm)
    ? searchTerm.join(",")
    : searchTerm || "";

  const data = await fetchList({ category, searchTerm: searchString });

  if (data.length === 0) {
    return (
      <div className="my-32">
        <ResultsForm category={category} />
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
    <>
      <ResultsList>{content}</ResultsList>
    </>
  );
}

const fetchList = async ({
  category,
  searchTerm,
}: {
  category: Category;
  searchTerm: string;
}) => {
  const { baseURL, endPoints, queryParams, headers } = query[category];
  const key = queryParams.apiKey
    ? queryParams.apiKey.name + "=" + queryParams.apiKey.value
    : "";

  let url;
  if (searchTerm) {
    url = baseURL + endPoints.search + searchTerm + (key ? "&" + key : "");
  } else {
    url = baseURL + endPoints.default + (key ? "?" + key : "");
  }
  console.log(url);
  const response = await fetch(url, headers ?? undefined);

  if (!response.ok) {
    throw new Error(
      `HTTP error! Status: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
};
