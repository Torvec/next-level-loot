// TODO: Sort by data, value, popularity
// TODO: Filter by Type or Platform
// Type Options: game, loot, beta
// Platform Options: pc, steam, epic-games-store, itchio, gog, origin, ubisoft, battlenet, drm-free, ps5, ps4, xbox-series-xs, xbox-one, switch, android, ios, vr

import FreeGamesCard from "./free-games-card";

export interface FreeGameType {
  id: number;
  title: string;
  worth: string;
  // thumbnail: string;
  image: string;
  description: string;
  instructions: string;
  open_giveaway_url: string;
  published_date: string;
  type: string;
  platforms: string;
  end_date: string;
  // users: number;
  // status: string;
  // gamerpower_url: string;
  // open_giveaway: string;
}

export default async function FreeGames() {
  try {
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const freeGames: FreeGameType[] = data;

    return (
      <>
        <h1 className="py-32 text-center text-4xl font-bold uppercase">
          Free Games
        </h1>
        <div className="mb-32 grid grid-cols-3 gap-8">
          {freeGames.map(
            ({
              id,
              title,
              type,
              worth,
              // thumbnail,
              image,
              description,
              instructions,
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
                  description={description}
                  instructions={instructions}
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
  } catch (error) {
    console.error("Error fetching free games:", error);
    return <div>Error loading free games.</div>;
  }
}
