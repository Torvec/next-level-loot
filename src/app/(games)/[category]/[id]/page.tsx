import { Category } from "../types";
import BestDealsCard from "../best-deals-card";
import FreeGamesCard from "../free-games-card";
import HighestRatedGamesCard from "../highest-rated-games-card";
import { fetchDetails } from "../fetch";

export default async function Page(props: {
  params: Promise<{
    id: string;
    category: string;
  }>;
}) {
  const { id, category } = await props.params;
  const urlDecodedCategory = decodeURIComponent(category) as Category;
  const urlDecodedId = decodeURIComponent(id);
  const data = await fetchDetails(urlDecodedCategory, urlDecodedId);

  let content;
  if (urlDecodedCategory === "best-deals") {
    content = <BestDealsCard {...data.gameInfo} />;
  } else if (urlDecodedCategory === "free-games") {
    content = <FreeGamesCard {...data} />;
  } else if (urlDecodedCategory === "highest-rated") {
    content = <HighestRatedGamesCard {...data} />;
  }

  return <div className="py-32">{content}</div>;
}
