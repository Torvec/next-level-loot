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
import { HighestRatedGameDetailsType } from "../types";
import Link from "next/link";

export default function HighestRatedDetails({
  name,
  background_image,
  metacritic,
  released,
  esrb_rating,
  description_raw,
  platforms,
  genres,
  stores,
  developers,
  publishers,
  tags,
}: HighestRatedGameDetailsType) {
  const dispatch = useWishlistDispatch();
  const isInWishlist = useIsInWishlist(name);

  const ScreenshotsSection = () => (
    <div className="w-full bg-gradient-to-t from-slate-900 sm:w-1/3">
      <img
        src={background_image}
        alt={name}
        className="mx-auto h-auto w-full object-cover object-center"
      />
      <div className="grid grid-cols-2 gap-4"></div>
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
        {list.length > 0 ? (
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
        ) : (
          <p className="text-center text-sm text-slate-500">Data Unavailable</p>
        )}
      </div>
    );
  };

  const DescriptionText = () => (
    <div>
      {description_raw ? (
        <>
          <h3 className="font-bold">Description</h3>
          <p className="text-sm leading-loose text-slate-300">
            {description_raw}
          </p>
        </>
      ) : (
        <div className="bg-neutral-900 px-4 py-2 text-center text-neutral-500">
          Description Unavailable
        </div>
      )}
    </div>
  );

  const FindDealsButton = () => (
    <Button className="w-full bg-neutral-500 hover:bg-neutral-600">
      <Link href={"/best-deals"}>Find Deals</Link>
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
    <>
      <div className="mb-4 flex w-full flex-col gap-4 sm:flex-row">
        <ScreenshotsSection />
        <Card className="flex w-full flex-col justify-between rounded-xl border-0 bg-gradient-to-t from-slate-900 sm:w-2/3">
          <CardHeader>
            <CardTitle className="flex flex-col justify-between gap-2 opacity-90 sm:flex-row">
              <TitleSection />
            </CardTitle>
            <CardDescription className="flex justify-between">
              <DescriptionSection />
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-3">
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
                title="Tags"
                list={tags}
                keyExtractor={(t) => t.id.toString()}
                renderItem={(t) => t.name}
              />
              <InfoList
                title="Stores"
                list={stores}
                keyExtractor={(s) => s.store.id.toString()}
                renderItem={(s) => s.store.name}
              />
              <InfoList
                title="Developers"
                list={developers}
                keyExtractor={(d) => d.id.toString()}
                renderItem={(d) => d.name}
              />
              <InfoList
                title="Publishers"
                list={publishers}
                keyExtractor={(p) => p.id.toString()}
                renderItem={(p) => p.name}
              />
            </div>
            <DescriptionText />
          </CardContent>
          <CardFooter className="flex-col justify-between gap-4 md:flex-row">
            <FindDealsButton />
            <WishlistButton />
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
