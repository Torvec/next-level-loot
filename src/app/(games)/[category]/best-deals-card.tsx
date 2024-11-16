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
  releaseDate,
}: GameDealType) {
  const dispatch = useWishlistDispatch();
  const isInWishlist = useIsInWishlist(title);
  const formattedSavings = parseFloat(savings).toFixed(0);
  const formattedReleaseDate = new Date(
    releaseDate * 1000,
  ).toLocaleDateString();

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

  const BannerSection = () => (
    <div className="relative h-32 overflow-hidden rounded-t-xl py-2 sm:py-4">
      <img src={thumb} alt="" className="h-32 w-full blur-md" aria-hidden />
      <img
        src={thumb}
        alt={title}
        className="absolute left-1/2 top-1/2 h-full max-h-20 w-auto -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );

  const TitleSection = () => (
    <>
      <h2 className="w-full sm:w-2/3">{title}</h2>
      <div className="flex flex-col text-right text-base">
        <div className="space-x-2">
          <span className="line-through opacity-70">${normalPrice}</span>
          <span className="text-xl">
            {salePrice !== "0.00" ? `$${salePrice}` : "FREE"}
          </span>
        </div>
        <span>{formattedSavings}% OFF!</span>
      </div>
    </>
  );

  const DescriptionSection = () => (
    <>
      <p>Released: {formattedReleaseDate}</p>
      <p>{rating} Deal!</p>
    </>
  );

  const MetacriticSection = () => (
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
            {metacriticScore !== "0" ? metacriticScore : "N/A"}
          </span>
        </a>
      ) : (
        <div className="bg-neutral-900 px-4 py-2 text-center text-neutral-500">
          Metacritic Data Unavailable
        </div>
      )}
    </div>
  );

  const SteamSection = () => (
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
            <span className="text-slate-400">{steamRatingCount} Reviews</span>
          </div>
        </a>
      ) : (
        <div className="bg-slate-900 px-4 py-2 text-center text-slate-500">
          Steam Data Unavailable
        </div>
      )}
    </div>
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

  const MoreDetailsButton = () => (
    <Button className="w-full bg-neutral-900 hover:bg-neutral-800">
      <Link href={`/best-deals/${dealID}`}>More Details -&gt;</Link>
    </Button>
  );

  return (
    <Card className="flex flex-col justify-between rounded-xl border-0 bg-gradient-to-t from-slate-900">
      <CardHeader>
        <BannerSection />
        <CardTitle className="flex flex-col justify-between gap-2 opacity-90 sm:flex-row">
          <TitleSection />
        </CardTitle>
        <CardDescription className="flex justify-between">
          <DescriptionSection />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-1">
        <MetacriticSection />
        <SteamSection />
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
          <MoreDetailsButton />
          <WishlistButton />
        </div>
      </CardFooter>
    </Card>
  );
}
