// TODO: Sort by data, value, popularity
// TODO: Filter by Type or Platform
// Type Options: game, loot, beta
// Platform Options: pc, steam, epic-games-store, itchio, gog, origin, ubisoft, battlenet, drm-free, ps5, ps4, xbox-series-xs, xbox-one, switch, android, ios, vr

import ResultsList from "@/components/ui/results-list";
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
      <ResultsList>
        {freeGames.map((fg) => (
          <FreeGamesCard
            key={fg.id}
            id={fg.id}
            title={fg.title}
            type={fg.type}
            worth={fg.worth}
            image={fg.image}
            open_giveaway_url={fg.open_giveaway_url}
            published_date={fg.published_date}
            platforms={fg.platforms}
            end_date={fg.end_date}
          />
        ))}
      </ResultsList>
    </>
  );
}
