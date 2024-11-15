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
}: GameDealType) {
  const dispatch = useWishlistDispatch();
  const isInWishlist = useIsInWishlist(title);
  const formattedSavings = parseFloat(savings).toFixed(0);
  const formattedDealRating = parseFloat(dealRating).toFixed(0);

  return (
    <Card className="flex flex-col justify-between rounded-xl border-neutral-700">
      <CardHeader>
        <div className="h-24 bg-neutral-900 py-4">
          <img src={thumb} alt={title} className="mx-auto h-full" />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="flex items-center justify-between text-lg">
          <p>{formattedDealRating}/10 Deal</p>
          <div className="flex flex-col text-right">
            <div>
              <span className="line-through opacity-70">${normalPrice}</span>{" "}
              <span className="font-bold">
                {salePrice > 0 ? `$${salePrice}` : "FREE"}
              </span>
            </div>
            <span>{formattedSavings}% OFF!</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex-col gap-4">
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
          <Button className="w-full bg-slate-900 hover:bg-slate-800">
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
