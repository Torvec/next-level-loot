import { Category } from "@/lib/types";
import DealsDetails from "@/app/(games)/[category]/[id]/deals-details";
import GiveawaysDetails from "@/app/(games)/[category]/[id]/giveaways-details";
import GamesDetails from "@/app/(games)/[category]/[id]/games-details";
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
    deals: <DealsDetails {...data} id={id} />,
    games: <GamesDetails {...data} />,
    giveaways: <GiveawaysDetails {...data} />,
  };

  const content = details[category];

  return <div className="py-32">{content}</div>;
}
