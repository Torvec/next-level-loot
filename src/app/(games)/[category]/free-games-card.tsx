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
import Link from "next/link";

export default function FreeGamesCard({
  id,
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

  const BannerSection = () => (
    <div className="bg-gradient-to-t from-slate-900">
      <img src={image} alt={title} className="mx-auto h-full" />
    </div>
  );

  const TitleSection = () => (
    <>
      <h2 className="w-full sm:w-2/3">{title}</h2>
      <div className="flex flex-col text-right text-base">
        <div className="space-x-2">
          <span className="line-through opacity-70">${worth}</span>
          <span className="text-xl">Free!</span>
        </div>
      </div>
    </>
  );

  const DescriptionSection = () => (
    <>
      <div>
        <p>Type: {type}</p>
        <p>Platforms: {platforms}</p>
      </div>
      <div className="text-right">
        <p>Started: {published_date}</p>
        <p>Ends: {end_date}</p>
      </div>
    </>
  );

  const MoreDetailsButton = () => (
    <Button className="w-full bg-neutral-900 hover:bg-neutral-800">
      <Link href={`/free-games/${id}`}>More Details -&gt;</Link>
    </Button>
  );

  const GiveawayButton = () => (
    <Button className="w-full bg-neutral-500 hover:bg-neutral-600">
      <a
        href={open_giveaway_url}
        target="_blank"
        rel="noopener noreferrer external"
      >
        Get Giveaway
      </a>
    </Button>
  );

  const WishlistButton = () => (
    <Button
      onClick={() => dispatch({ type: "ADD", item: title })}
      className="w-full bg-yellow-500 text-blue-900 hover:bg-yellow-400"
      disabled={isInWishlist}
    >
      {isInWishlist ? "In Wishlist" : "+ Wishlist"}
    </Button>
  );

  return (
    <Card className="flex flex-col justify-between rounded-xl border-0 bg-gradient-to-t from-slate-900">
      <CardHeader>
        <BannerSection />
        <CardTitle className="flex flex-col justify-between gap-2 opacity-90 sm:flex-row">
          <TitleSection />
        </CardTitle>
        <CardDescription className="flex flex-col justify-between gap-4 sm:flex-row">
          <DescriptionSection />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GiveawayButton />
      </CardContent>
      <CardFooter className="flex-col justify-between gap-4 md:flex-row">
        <MoreDetailsButton />
        <WishlistButton />
      </CardFooter>
    </Card>
  );
}
