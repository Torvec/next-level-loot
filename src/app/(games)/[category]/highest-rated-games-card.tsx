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
import { HighestRatedGameType } from "./types";
import { useWishlistDispatch } from "@/lib/wishlist-provider";
import useIsInWishlist from "@/lib/use-is-in-wishlist";
import Link from "next/link";

export default function HighestRatedGamesCard({
  id,
  name,
  platforms,
  stores,
  released,
  background_image,
  metacritic,
  esrb_rating,
  genres,
}: HighestRatedGameType) {
  const dispatch = useWishlistDispatch();
  const isInWishlist = useIsInWishlist(name);

  const BannerSection = () => (
    <div className="bg-gradient-to-t from-slate-900">
      <img
        src={background_image}
        alt={name}
        className="mx-auto h-64 object-cover object-center"
      />
    </div>
  );

  const TitleSection = () => (
    <>
      <h2 className="w-full sm:w-2/3">{name}</h2>
      <div className="flex flex-col">
        <span className="text-base font-normal uppercase text-neutral-400 sm:text-center">
          Score
        </span>
        <span className="text-xl">{metacritic}/100</span>
      </div>
    </>
  );

  const DescriptionSection = () => (
    <>
      <p>Released: {released}</p>
      <p>ESRB: {esrb_rating ? esrb_rating.name : "Not Rated"}</p>
    </>
  );

  const InfoList = <T,>(props: {
    title: string;
    list: T[];
    keyExtractor: (item: T) => string;
    renderItem: (item: T) => React.ReactNode;
  }) => {
    const { title, list, keyExtractor, renderItem } = props;

    return (
      <div className="space-y-2">
        <h3 className="text-center text-sm font-bold">{title}</h3>
        <ul className="space-y-1">
          {list.map((item) => (
            <li
              key={keyExtractor(item)}
              className="rounded-xl bg-slate-800 px-2 py-1 text-sm text-slate-300 hover:scale-110 hover:bg-slate-700"
            >
              {renderItem(item)}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const MoreDetailsButton = () => (
    <Button className="w-full bg-neutral-900 hover:bg-neutral-800">
      <Link href={`/highest-rated/${id}`}>More Details -&gt;</Link>
    </Button>
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

  return (
    <Card className="flex flex-col justify-between rounded-xl border-0 bg-gradient-to-t from-slate-900">
      <CardHeader>
        <BannerSection />
        <CardTitle className="flex flex-col justify-between gap-2 opacity-90 sm:flex-row sm:items-center">
          <TitleSection />
        </CardTitle>
        <CardDescription className="flex flex-col justify-between gap-2 sm:flex-row">
          <DescriptionSection />
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-3">
        <InfoList
          title="Platforms"
          list={platforms}
          keyExtractor={(p) => p.platform.id.toString()}
          renderItem={(p) => p.platform.name}
        />
        <InfoList
          title="Genres"
          list={genres}
          keyExtractor={(genre) => genre.id.toString()}
          renderItem={(genre) => genre.name}
        />
        <InfoList
          title="Stores"
          list={stores}
          keyExtractor={(s) => s.store.id.toString()}
          renderItem={(s) => s.store.name}
        />
      </CardContent>
      <CardFooter className="flex-col justify-between gap-4 md:flex-row">
        <MoreDetailsButton />
        <WishlistButton />
      </CardFooter>
    </Card>
  );
}
