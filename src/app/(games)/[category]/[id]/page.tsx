import { Category } from "@/lib/types";
import { fetchOptions } from "@/lib/fetch";
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

  const categoryComponents: Record<Category, JSX.Element> = {
    "best-deals": <BestDealsDetails {...data} id={id} />,
    "free-games": <FreeGamesDetails {...data} />,
    "highest-rated": <HighestRatedDetails {...data} />,
  };

  const content = categoryComponents[category];

  return <div className="py-32">{content}</div>;
}

async function fetchDetails({
  category,
  id,
}: {
  category: Category;
  id: string | number;
}) {
  const { baseURL, apiKey, headers, endPoints } = fetchOptions[category];

  const url = baseURL + endPoints.details + id + (apiKey ? "?" + apiKey : "");

  const response = await fetch(url, headers ?? undefined);

  if (!response.ok) {
    throw new Error(
      `HTTP error! Status: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}
