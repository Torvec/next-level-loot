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
import { FreeGameType } from "./types";
import { useWishlistDispatch } from "@/lib/wishlist-provider";
import useIsInWishlist from "@/lib/use-is-in-wishlist";

export default function FreeGamesCard({
  title,
  type,
  worth,
  image,
  open_giveaway_url,
  published_date,
  platforms,
  end_date,
}: FreeGameType) {
  const dispatch = useWishlistDispatch();
  const isInWishlist = useIsInWishlist(title);

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
        <p>Platforms: {platforms}</p>
        <p>Worth: {worth}</p>
        <p>
          Published Date: {published_date} - End Date: {end_date}
        </p>
      </CardContent>
      <CardFooter className="flex-col justify-between gap-4 md:flex-row">
        <Button className="w-full bg-neutral-500 hover:bg-neutral-600">
          <a
            href={open_giveaway_url}
            target="_blank"
            rel="noopener noreferrer external"
          >
            Grab It
          </a>
        </Button>
        <Button
          onClick={() => dispatch({ type: "ADD", item: title })}
          className="w-full bg-yellow-500 text-blue-900 hover:bg-yellow-400"
          disabled={isInWishlist}
        >
          {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
        </Button>
      </CardFooter>
    </Card>
  );
}
