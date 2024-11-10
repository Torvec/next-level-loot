// TODO: Sort by data, value, popularity
// TODO: Filter by Type or Platform
// Type Options: game, loot, beta
// Platform Options: pc, steam, epic-games-store, itchio, gog, origin, ubisoft, battlenet, drm-free, ps5, ps4, xbox-series-xs, xbox-one, switch, android, ios, vr

import FreeGamesCard from "./free-games-card";
import { FreeGameType } from "./types";

export default async function FreeGames() {
  const rapidAPIKey = process.env.RAPIDAPI_KEY;

  if (!rapidAPIKey) {
    throw new Error("RAPIDAPI_KEY is not defined");
  }

  const response = await fetch(
    "https://gamerpower.p.rapidapi.com/api/giveaways?sort=value",
    {
      headers: {
        "X-RapidAPI-Key": rapidAPIKey,
        "X-RapidAPI-Host": "gamerpower.p.rapidapi.com",
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `HTTP error! Status: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();
  const freeGames: FreeGameType[] = data;

  return (
    <>
      <h1 className="py-32 text-center text-4xl font-bold uppercase">
        Free Games
      </h1>
      <div className="mb-32 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {freeGames.map(
          ({
            id,
            title,
            type,
            worth,
            // thumbnail,
            image,
            // description,
            // instructions,
            open_giveaway_url,
            published_date,
            platforms,
            end_date,
          }) => {
            return (
              <FreeGamesCard
                key={id}
                id={id}
                title={title}
                type={type}
                worth={worth}
                image={image}
                // description={description}
                // instructions={instructions}
                open_giveaway_url={open_giveaway_url}
                published_date={published_date}
                platforms={platforms}
                end_date={end_date}
              />
            );
          },
        )}
      </div>
    </>
  );
}
