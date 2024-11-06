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
import { GameDealType } from "./page";

export default function BestDealsCard({
  thumb,
  title,
  salePrice,
  normalPrice,
  savings,
  dealRating,
  steamAppID,
}: GameDealType) {
  const formattedSavings = parseFloat(savings).toFixed(0);
  const formattedDealRating = parseFloat(dealRating).toFixed(0);

  return (
    <Card className="rounded-xl border-neutral-700">
      <CardHeader>
        <CardDescription className="h-24 bg-neutral-900 py-4">
          <img src={thumb} alt={title} className="mx-auto h-full" />
        </CardDescription>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Sale Price: {salePrice}</p>
        <p>Retail Price: {normalPrice}</p>
        <p>Savings: {formattedSavings}%</p>
        <p>Deal Rating: {formattedDealRating}</p>
      </CardContent>
      <CardFooter className="justify-between">
        {steamAppID && (
          <Button className="bg-slate-700 hover:bg-slate-500">
            <a
              href={`https://store.steampowered.com/app/${steamAppID}`}
              target="_blank"
              rel="noopener noreferrer external"
            >
              View on Steam
            </a>
          </Button>
        )}
        <Button className="bg-yellow-500 text-blue-900 hover:bg-yellow-400">
          Add to Wishlist
        </Button>
      </CardFooter>
    </Card>
  );
}
