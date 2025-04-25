import { type Category } from "@/types/types";
import {
  DealsDetailsHeader,
  DealsDetailsMainColumn,
  DealsDetailsSideBar,
} from "./deals-details";
import {
  GamesDetailsHeader,
  GamesDetailsMainColumn,
  GamesDetailsSideBar,
} from "./games-details";
import {
  GiveawaysDetailsHeader,
  GiveawaysDetailsMainColumn,
  GiveawaysDetailsSideBar,
} from "./giveaways-details";
import fetchData from "@/lib/fetch-data";

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
}: {
  params: Promise<{ id: string; category: Category }>;
}) {
  // Next gets the id and category from the params
  const { id, category } = await params;

  // Fetch data based off of the current category and id (NOTE: id is only so I can add specific games to wishlist)
  const data = await fetchData({ category, id });

  // Pass the fetched data to the component that needs it based on the current category
  const details = {
    deals: {
      header: <DealsDetailsHeader {...data} />,
      mainColumn: <DealsDetailsMainColumn {...data} id={id} />,
      sideBar: <DealsDetailsSideBar {...data} />,
    },
    games: {
      header: <GamesDetailsHeader {...data} />,
      mainColumn: <GamesDetailsMainColumn {...data} />,
      sideBar: <GamesDetailsSideBar {...data} />,
    },
    giveaways: {
      header: <GiveawaysDetailsHeader {...data} />,
      mainColumn: <GiveawaysDetailsMainColumn {...data} />,
      sideBar: <GiveawaysDetailsSideBar {...data} />,
    },
  };

  return (
    <article className="px-4 py-32 xl:px-0">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <section className="space-y-4 rounded-xl bg-gradient-to-t from-muted to-muted/20 p-6">
          {details[category].header}
        </section>
        <div className="flex flex-col gap-6 md:flex-row">
          <section className="w-full space-y-6 rounded-xl bg-gradient-to-tl from-muted to-muted/20 p-6 md:w-2/3">
            {details[category].mainColumn}
          </section>
          <section className="w-full space-y-4 rounded-xl bg-gradient-to-tr from-muted to-muted/20 p-6 md:w-1/3">
            {details[category].sideBar}
          </section>
        </div>
      </div>
    </article>
  );
}
