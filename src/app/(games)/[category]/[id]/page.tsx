import { Category } from "../types";
import { fetchData } from "../fetch";
import BestDealsDetails from "./best-deals-details";
import FreeGamesDetails from "./free-games-details";
import HighestRatedDetails from "./highest-rated-details";

export default async function Page(props: {
  params: Promise<{
    id: string | number;
    category: Category;
  }>;
}) {
  const { id, category } = await props.params;

  const fetchDetails = async (category: Category, id: string | number) => {
    const { baseURL, apiKey, headers, fetchEndPoints } = fetchData[category];
    const endpoint = fetchEndPoints.details;
    const url = `${baseURL}${endpoint}${id}${apiKey ? `?${apiKey}` : ""}`;
    const response = await fetch(url, headers ?? undefined);
    if (!response.ok) {
      throw new Error(
        `HTTP error! Status: ${response.status} ${response.statusText}`,
      );
    }
    return response.json();
  };

  const data = await fetchDetails(category, id);

  let content;
  if (category === "best-deals") {
    content = <BestDealsDetails {...data} />;
  } else if (category === "free-games") {
    content = <FreeGamesDetails {...data} />;
  } else if (category === "highest-rated") {
    content = <HighestRatedDetails {...data} />;
  }

  return <div className="py-32">{content}</div>;
}
