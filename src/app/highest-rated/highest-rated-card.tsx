/* eslint-disable @next/next/no-img-element */
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HighestRatedGameType } from "./page";

export default function HighestRatedCard({
  name,
  platforms,
  stores,
  released,
  background_image,
  metacritic,
  esrb_rating,
  short_screenshots,
  genres,
}: HighestRatedGameType) {
  return (
    <Card className="rounded-xl border-neutral-700">
      <CardHeader>
        <CardDescription>
          <img src={background_image} alt={name} />
        </CardDescription>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Metacritic Score: {metacritic}</p>
        <p>Platforms:</p>
        <ul>
          {platforms.map((p) => (
            <li key={p.platform.id}>{p.platform.name}</li>
          ))}
        </ul>
        <p>Stores:</p>
        <ul>
          {stores ? (
            stores.map((s) => <li key={s.store.id}>{s.store.name}</li>)
          ) : (
            <li>No stores available</li>
          )}
        </ul>
        <p>Released: {released}</p>
        <p>ESRB Rating: {esrb_rating ? esrb_rating.name : "Not Rated"}</p>
        <p>Genres:</p>
        <ul>
          {genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
        <div>
          <h3>Screenshots</h3>
          <ul className="grid grid-cols-3 gap-4">
            {short_screenshots.map((screenshot) => (
              <li key={screenshot.id}>
                <img src={screenshot.image} alt={`${name} screenshot`} />
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="bg-neutral-500">Deals</Button>
      </CardFooter>
    </Card>
  );
}
