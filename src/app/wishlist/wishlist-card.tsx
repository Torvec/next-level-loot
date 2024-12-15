"use client";
/* eslint-disable @next/next/no-img-element */

import { Button } from "@/components/ui/button";
import MoreDetailsButton from "@/components/ui/buttons/details-button";
import BannerSection from "@/components/ui/banner-section";
import { X } from "lucide-react";
import { useWishlistDispatch } from "@/components/providers/wishlist-provider";
import { type WishlistItemType } from "@/types/types";

// Main Component

export default function WishlistCard({
  item,
  index,
}: {
  item: WishlistItemType;
  index: number;
}) {
  return (
    <section className="rounded-xl bg-muted p-6">
      <div className="flex w-full flex-col gap-6 md:flex-row md:justify-between">
        <div className="flex flex-col gap-6 md:flex-1 md:flex-row md:items-center">
          <div className="md:w-1/3">
            <BannerSection src={item.src} alt={item.title} />
          </div>
          <div className="flex h-full flex-col justify-between gap-4 md:w-2/3 md:gap-0">
            <div className="my-auto">
              <h2 className="font-bold">{item.title}</h2>
              {item.store && (
                <span className="block text-sm text-muted-foreground">
                  {item.store}
                </span>
              )}
              {item.type && (
                <span className="block text-sm text-muted-foreground">
                  Type: {item.type}
                </span>
              )}
              <span className="text-lg text-highlight">
                {displayPrice(item.price)}
              </span>
            </div>
            <span className="block text-xs italic text-muted-foreground">
              Added: {displayDateTime(item.timestamp)}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <MoreDetailsButton path={item.path} id={item.id} />
          <RemoveItemButton index={index} />
        </div>
      </div>
    </section>
  );
}

// Sub-Components

const RemoveItemButton = ({ index }: { index: number }) => {
  const dispatch = useWishlistDispatch();

  return (
    <Button
      onClick={() => dispatch({ type: "REMOVE", index })}
      className="bg-destructive text-destructive-foreground hover:bg-destructive-foreground hover:text-destructive"
    >
      <X />
    </Button>
  );
};

// Utility Functions

const displayPrice = (price: string | number | undefined) => {
  let formattedPrice;

  if (!price) {
    formattedPrice = "";
  } else if (price === "0.00" || price === "Free") {
    formattedPrice = "FREE!";
  } else {
    formattedPrice = `$${price}`;
  }

  return formattedPrice;
};

const displayDateTime = (timestamp: number) => {
  const dateTime = new Date(timestamp);
  return dateTime.toLocaleString();
};
