import { Category } from "@/lib/types";
import { query } from "@/lib/query";
import BestDealsDetails from "@/components/best-deals/best-deals-details";
import FreeGamesDetails from "@/components/free-games/free-games-details";
import HighestRatedDetails from "@/components/highest-rated/highest-rated-details";

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string | number;
    category: Category;
  }>;
}) {
  const { id, category } = await params;

  const data = await fetchDetails({ category, id });

  const details: Record<Category, JSX.Element> = {
    "best-deals": <BestDealsDetails {...data} id={id} />,
    "free-games": <FreeGamesDetails {...data} />,
    "highest-rated": <HighestRatedDetails {...data} />,
  };

  const content = details[category];

  return <div className="pb-32">{content}</div>;
}

async function fetchDetails({
  category,
  id,
}: {
  category: Category;
  id: string | number;
}) {
  const { baseURL, endPoints, queryParams, headers } = query[category];
  const key = queryParams.apiKey
    ? queryParams.apiKey.name + "=" + queryParams.apiKey.value
    : "";

  const url = baseURL + endPoints.details + id + (key ? "?" + key : "");

  const response = await fetch(url, headers ?? undefined);

  if (!response.ok) {
    throw new Error(
      `HTTP error! Status: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}
