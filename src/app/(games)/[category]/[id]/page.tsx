import { type Category } from "@/lib/types";
import DealsDetails from "./deals-details";
import GamesDetails from "./games-details";
import GiveawaysDetails from "./giveaways-details";
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
