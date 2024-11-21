import { Category } from "../types";
import { fetchDetails } from "@/lib/fetch";
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

  const data = await fetchDetails(category, id);

  const categoryComponents: Record<Category, JSX.Element> = {
    "best-deals": <BestDealsDetails {...data} />,
    "free-games": <FreeGamesDetails {...data} />,
    "highest-rated": <HighestRatedDetails {...data} />,
  };

  const content = categoryComponents[category];

  return <div className="py-32">{content}</div>;
}
