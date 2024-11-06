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
import { FreeGameType } from "./page";

export default function FreeGamesCard({
  title,
  type,
  worth,
  image,
  description,
  instructions,
  open_giveaway_url,
  published_date,
  platforms,
  end_date,
}: FreeGameType) {
  return (
    <Card className="rounded-xl border-neutral-700">
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
  );
}
