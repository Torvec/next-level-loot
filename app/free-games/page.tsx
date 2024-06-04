/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import ExternalLink from "@/components/ExternalLink";
import type { FreeGamesTypes } from "@/types/freeGamesTypes";

const gamerpowerBaseURL = "https://gamerpower.p.rapidapi.com/api/";

const gamerpowerGiveaways = "giveaways";

const gamerpowerIndividualGiveaway = "giveaway?id=";

const queryParameters = {
  platform: [
    "pc",
    "steam",
    "epic-games-store",
    "itchio",
    "gog",
    "ubisoft",
    "vr",
    "origin",
    "battlenet",
    "xbox-360",
    "xbox-one",
    "xbox-series-xs",
    "ps4",
    "ps5",
    "switch",
    "android",
    "ios",
    "drm-free",
  ],
  type: ["game", "loot", "beta"],
  "sort-by": ["value", "popularity"],
};

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": `${process.env.GAMERPOWER_API_KEY}`,
    "x-rapidapi-host": "gamerpower.p.rapidapi.com",
  },
};

async function fetchFreeGames(url: string) {
  try {
    const response = await fetch(gamerpowerBaseURL + url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

const PageHeader = () => {
  return (
    <header className="mb-16 bg-blue-950 py-32 text-center">
      <h2 className=" text-4xl font-bold">Free Games and Giveaways</h2>
      <p className="text-sm">
        Powered by{" "}
        <ExternalLink
          href="https://www.gamerpower.com/api-read"
          displayText="Gamerpower Free Games & Giveaways API"
        />
      </p>
    </header>
  );
};

const GameList = ({ list }: { list: FreeGamesTypes[] }) => {
  return (
    <section className="grid gap-10 md:grid-cols-3">
      {list.map(
        ({
          id,
          title,
          worth,
          thumbnail,
          published_date,
          type,
          platforms,
          end_date,
          users,
          status,
        }: FreeGamesTypes) => (
          <div key={id} className="rounded-xl bg-white/10 p-8 shadow-xl">
            <h3 className="mb-4 text-pretty text-2xl">{title}</h3>
            <ul>
              <li>
                <img src={thumbnail} alt={title} className="h-auto w-full" />
              </li>
              <li>
                Start: {published_date} - End: {end_date}
              </li>
              <li>Type: {type}</li>
              <li>Platforms: {platforms}</li>
              <li># of Users: {users}</li>
              <li>Status: {status}</li>
              <li>Worth: {worth}</li>
              <Link href={`/free-games/${id}`}>Details</Link>
            </ul>
          </div>
        ),
      )}
    </section>
  );
};

export default async function FreeGames() {
  const data = await fetchFreeGames(gamerpowerGiveaways);

  return (
    <main className="container mx-auto bg-slate-600 pb-32">
      <PageHeader />
      <GameList list={data} />
    </main>
  );
}
