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
import { GameDealDetailsType } from "../types";

export default function BestDealsDetails({
  gameInfo,
  cheaperStores,
}: GameDealDetailsType) {
  const {
    // storeID,
    // gameID,
    name,
    steamAppID,
    salePrice,
    retailPrice,
    steamRatingText,
    steamRatingPercent,
    steamRatingCount,
    metacriticScore,
    metacriticLink,
    releaseDate,
    thumb,
  } = gameInfo;
  const dispatch = useWishlistDispatch();
  const isInWishlist = useIsInWishlist(name);
  const formattedReleaseDate = new Date(
    releaseDate * 1000,
  ).toLocaleDateString();

  const stores: { [key: number]: string } = {
    1: "Steam",
    2: "Gamersgate",
    3: "Green ManGaming",
    4: "Amazon",
    5: "Gamestop",
    6: "Direct2drive",
    7: "Gog",
    8: "Origin",
    9: "Get Games",
    10: "Shiny Loot",
    11: "Humble Store",
    12: "Desura",
    13: "Uplay",
    14: "Indiegamestand",
    15: "Fanatical",
    16: "Games Rocket",
    17: "Games Republic",
    18: "Silagames",
    19: "Playfield",
    20: "Imperial Games",
    21: "Win Game Store",
    22: "Funstockdigital",
    23: "Gamebillet",
    24: "Voidu",
    25: "Epic Games Store",
    26: "Razer Game Store",
    27: "Gamesplanet",
    28: "Gamesload",
    29: "2game",
    30: "Indiegala",
    31: "Blizzard Shop",
    32: "Allyouplay",
    33: "Dlgamer",
    34: "Noctre",
    35: "Dreamgame",
  };

  const TitleSection = () => (
    <>
      <h2 className="w-full sm:w-2/3">{name}</h2>
      <div className="flex flex-col text-right text-base">
        <div className="space-x-2">
          <span className="line-through opacity-70">${retailPrice}</span>
          <span className="text-xl">
            {salePrice !== "0.00" ? `$${salePrice}` : "FREE!"}
          </span>
        </div>
      </div>
    </>
  );

  const MetaCriticSection = () => (
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
            {metacriticScore === "0" ? metacriticScore : "N/A"}
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
      onClick={() => dispatch({ type: "ADD", item: name })}
      className="w-full bg-yellow-500 text-blue-900 hover:bg-yellow-400"
      disabled={isInWishlist}
    >
      {isInWishlist ? "In Wishlist" : "+ Wishlist"}
    </Button>
  );

  const CheaperDealsSection = () => (
    <div className="rounded-xl bg-gradient-to-t from-slate-900 p-4">
      <h3 className="text-xl font-bold">Cheaper Deals</h3>
      <div className="flex flex-col gap-8 sm:flex-row">
        {cheaperStores.length > 0 ? (
          cheaperStores.map(({ dealID, storeID, salePrice, retailPrice }) => (
            <div key={dealID} className="space-y-2 p-4">
              <h3 className="font-bold">{stores[parseInt(storeID)]}</h3>
              <div className="space-x-2">
                <span className="line-through opacity-70">${retailPrice}</span>
                <span className="text-xl">
                  {salePrice !== "0.00" ? `$${salePrice}` : "FREE"}
                </span>
              </div>
              <Button className="w-full rounded-xl bg-slate-800 hover:bg-slate-700">
                <a href={`/best-deals/${dealID}`}>View Deal</a>
              </Button>
            </div>
          ))
        ) : (
          <p className="flex-grow p-8 text-center text-slate-400">
            No cheaper deals found
          </p>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="mb-4 flex w-full flex-col gap-4 sm:flex-row">
        <div className="rounded-xl bg-gradient-to-t from-slate-900 p-2 sm:p-4">
          <img src={thumb} alt={name} className="mx-auto h-max w-auto" />
        </div>
        <Card className="flex flex-grow flex-col justify-between rounded-xl border-0 bg-gradient-to-t from-slate-900">
          <CardHeader>
            <CardTitle className="flex flex-col justify-between gap-2 opacity-90 sm:flex-row">
              <TitleSection />
            </CardTitle>
            <CardDescription className="flex justify-between">
              <p>Released: {formattedReleaseDate}</p>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            <MetaCriticSection />
            <SteamSection />
          </CardContent>
          <CardFooter>
            <WishlistButton />
          </CardFooter>
        </Card>
      </div>
      <CheaperDealsSection />
    </>
  );
}
