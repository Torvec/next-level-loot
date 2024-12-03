import { Category } from "@/lib/types";
import BestDealsDetails from "@/components/ui/details/best-deals-details";
import FreeGamesDetails from "@/components/ui/details/free-games-details";
import HighestRatedDetails from "@/components/ui/details/highest-rated-details";
import fetchData from "@/lib/fetch-data";

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
    category: Category;
  }>;
}) {
  const { id, category } = await params;

  const data = await fetchData({ category, id });

  const details: Record<Category, JSX.Element> = {
    "best-deals": <BestDealsDetails {...data} id={id} />,
    "free-games": <FreeGamesDetails {...data} />,
    "highest-rated": <HighestRatedDetails {...data} />,
  };

  const content = details[category];

  return <div className="py-32">{content}</div>;
}
