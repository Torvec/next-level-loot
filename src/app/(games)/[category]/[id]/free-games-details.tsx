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
import { useWishlistDispatch } from "@/lib/wishlist-provider";
import useIsInWishlist from "@/lib/use-is-in-wishlist";
import { FreeGameDetailsType } from "../types";

export default function FreeGamesDetails({
  title,
  worth,
  image,
  description,
  instructions,
  open_giveaway_url,
  published_date,
  type,
  platforms,
  end_date,
}: FreeGameDetailsType) {
  const dispatch = useWishlistDispatch();
  const isInWishlist = useIsInWishlist(title);

  const BannerSection = () => (
    <div className="rounded-xl bg-gradient-to-t from-slate-900 p-2 sm:p-4">
      <img src={image} alt={title} className="mx-auto h-max w-auto" />
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

  const DescriptionText = () => (
    <div>
      {description ? (
        <>
          <h3 className="font-bold">Description</h3>
          <p>{description}</p>
        </>
      ) : (
        <div className="bg-neutral-900 px-4 py-2 text-center text-neutral-500">
          Description Unavailable
        </div>
      )}
    </div>
  );

  const InstructionsText = () => (
    <div>
      {instructions ? (
        <>
          <h3 className="font-bold">Instructions</h3>
          <p>{instructions}</p>
        </>
      ) : (
        <div className="bg-slate-900 px-4 py-2 text-center text-slate-500">
          Instructions Unavailable
        </div>
      )}
    </div>
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
    <>
      <div className="mb-4 flex w-full flex-col gap-4 sm:flex-row">
        <BannerSection />
        <Card className="flex flex-grow flex-col justify-between rounded-xl border-0 bg-gradient-to-t from-slate-900">
          <CardHeader>
            <CardTitle className="flex flex-col justify-between gap-2 opacity-90 sm:flex-row">
              <TitleSection />
            </CardTitle>
            <CardDescription className="flex justify-between">
              <DescriptionSection />
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            <DescriptionText />
            <InstructionsText />
          </CardContent>
          <CardFooter className="flex-col justify-between gap-4 md:flex-row">
            <GiveawayButton />
            <WishlistButton />
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
