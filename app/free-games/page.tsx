"usc client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import ExternalLink from "@/components/ExternalLink";
import type { FreeGamesTypes } from "@/types/freeGamesTypes";
import FreeGamesFilter from "./FreeGamesFilter";

// const gamerpowerGiveawaysURL = "https://gamerpower.p.rapidapi.com/api/giveaways";

// const options = {
//   method: "GET",
//   headers: {
//     "x-rapidapi-key": `${process.env.GAMERPOWER_API_KEY}`,
//     "x-rapidapi-host": "gamerpower.p.rapidapi.com",
//   },
// };

// async function fetchFreeGames() {
//   try {
//     const response = await fetch(gamerpowerGiveawaysURL, options);
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error(error);
//   }
// }

async function freeGamesQuery(formData: FormData) {
  const platform = formData.get("platform");
  const type = formData.get("type");
  const sort = formData.get("sort");
  const response = await fetch(
    `https://gamerpower.p.rapidapi.com/api/giveaways?platform=${platform}&type=${type}&sort-by=${sort}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": `${process.env.GAMERPOWER_API_KEY}`,
        "x-rapidapi-host": "gamerpower.p.rapidapi.com",
      },
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
}

const PageHeader = () => {
  return (
    <header className="mb-8 bg-blue-950 py-32 text-center">
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
  await freeGamesQuery(data);

  return (
    <main className="container mx-auto bg-slate-600 pb-32">
      <PageHeader />
      <FreeGamesFilter />
      <GameList list={data} />
    </main>
  );
}
