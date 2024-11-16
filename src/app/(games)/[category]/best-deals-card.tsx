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
import { GameDealType } from "./types";
import { useWishlistDispatch } from "@/lib/wishlist-provider";
import useIsInWishlist from "@/lib/use-is-in-wishlist";
import Link from "next/link";

export default function BestDealsCard({
  dealID,
  thumb,
  title,
  salePrice,
  normalPrice,
  savings,
  dealRating,
  metacriticLink,
  metacriticScore,
  steamAppID,
  steamRatingText,
  steamRatingPercent,
  steamRatingCount,
}: GameDealType) {
  const dispatch = useWishlistDispatch();
  const isInWishlist = useIsInWishlist(title);
  const formattedSavings = parseFloat(savings).toFixed(0);

  const formattedDealRating = parseFloat(dealRating).toFixed(0);
  const ratings: { [key: number]: string } = {
    1: "Abysmal",
    2: "Terrible",
    3: "Poor",
    4: "Bad",
    5: "Mediocre",
    6: "Fair",
    7: "Good",
    8: "Very Good",
    9: "Excellent",
    10: "Perfect",
  };
  const rating = ratings[parseInt(formattedDealRating)];

  return (
    <Card className="flex flex-col justify-between rounded-xl border-0 bg-slate-950">
      <CardHeader>
        <div className="h-24 bg-gradient-to-t from-slate-900 py-2 sm:py-4">
          <img src={thumb} alt={title} className="mx-auto h-full" />
        </div>
        <CardTitle className="flex flex-col justify-between gap-2 opacity-90 sm:flex-row">
          <h2 className="w-full sm:w-2/3">{title}</h2>
          <div className="flex flex-col text-right text-base">
            <div>
              <span className="line-through opacity-70">${normalPrice}</span>{" "}
              <span className="text-xl">
                {salePrice > 0 ? `$${salePrice}` : "FREE"}
              </span>
            </div>
            <span>{formattedSavings}% OFF!</span>
          </div>
        </CardTitle>
        <CardDescription>
          <p>{rating} Deal!</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-1">
        <div>
          {metacriticLink ? (
            <a
              href={`https://www.metacritic.com${metacriticLink}`}
              target="_blank"
              rel="noopener external"
              className="flex w-full items-center justify-between bg-neutral-800 px-4 py-2 hover:opacity-80"
            >
              <h3 className="font-bold">Metacritic</h3>
              <span className="text-lg font-bold">
                {metacriticScore > 0 ? metacriticScore : "N/A"}
              </span>
            </a>
          ) : (
            <div className="bg-neutral-900 px-4 py-2 text-center text-neutral-500">
              Metacritic Data Unavailable
            </div>
          )}
        </div>
        <div>
          {steamAppID ? (
            <a
              href={`https://store.steampowered.com/app/${steamAppID}`}
              target="_blank"
              rel="noopener external"
              className="flex w-full justify-between bg-slate-900 px-4 py-2 text-slate-300 hover:opacity-80"
            >
              <h3 className="font-bold">Steam</h3>
              <div className="flex flex-col text-right">
                <span className="font-bold sm:text-lg">
                  {steamRatingPercent}% {steamRatingText}
                </span>
                <span className="text-slate-400">
                  {steamRatingCount} Reviews
                </span>
              </div>
            </a>
          ) : (
            <div className="bg-slate-900 px-4 py-2 text-center text-slate-500">
              Steam Data Unavailable
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
          <Button className="w-full bg-neutral-900 hover:bg-neutral-800">
            <Link href={`/best-deals/${dealID}`}>More Details -&gt;</Link>
          </Button>
          <Button
            onClick={() => dispatch({ type: "ADD", item: title })}
            className="w-full bg-yellow-500 text-blue-900 hover:bg-yellow-400"
            disabled={isInWishlist}
          >
            {isInWishlist ? "In Wishlist" : "+ Wishlist"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
