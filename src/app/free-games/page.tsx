// TODO: Sort by data, value, popularity
// TODO: Filter by Type or Platform
// Type Options: game, loot, beta
// Platform Options: pc, steam, epic-games-store, itchio, gog, origin, ubisoft, battlenet, drm-free, ps5, ps4, xbox-series-xs, xbox-one, switch, android, ios, vr

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function FreeGames() {
  interface FreeGame {
    id: number;
    title: string;
    worth: string;
    thumbnail: string;
    image: string;
    description: string;
    instructions: string;
    open_giveaway_url: string;
    published_date: string;
    type: string;
    platforms: string;
    end_date: string;
    users: number;
    status: string;
    gamerpower_url: string;
    open_giveaway: string;
  }

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
    const freeGames: FreeGame[] = data;

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
            }) => (
              <Card key={id} className="rounded-xl border-neutral-700">
                <CardHeader>
                  <CardDescription>
                    <img src={image} alt={title} />
                  </CardDescription>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Loot Type: {type}</p>
                  <p>{description}</p>
                  <p>Platforms: {platforms}</p>
                  <p>Worth: {worth}</p>
                  <p>
                    Published Date: {published_date} - End Date: {end_date}
                  </p>
                  <p>{instructions}</p>
                </CardContent>
                <CardFooter>
                  <Button className="bg-neutral-500">
                    <a
                      href={open_giveaway_url}
                      target="_blank"
                      rel="noopener noreferrer external"
                    >
                      Grab It
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ),
          )}
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching free games:", error);
    return <div>Error loading free games.</div>;
  }
}
