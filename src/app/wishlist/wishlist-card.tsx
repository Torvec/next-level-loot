"use client";
/* eslint-disable @next/next/no-img-element */

import { Button } from "@/components/ui/button";
import MoreDetailsButton from "@/components/ui/buttons/details-button";
import BannerSection from "@/components/ui/banner-section";
import { X, Grip, ChevronUp, ChevronDown } from "lucide-react";
import { useWishlistDispatch } from "@/components/providers/wishlist-provider";
import { type WishlistItemType } from "@/types/types";

// Main Component

export default function WishlistCard({
  items,
  index,
}: {
  items: WishlistItemType;
  index: number;
}) {
  return (
    <section className="flex items-center gap-4 rounded-xl bg-muted p-6">
      <MoveItemButton />
      <div className="flex w-full flex-col gap-6 md:flex-row md:justify-between">
        <div className="flex flex-col gap-6 md:flex-1 md:flex-row md:items-center">
          <div className="md:w-1/3">
            <BannerSection src={items.src} alt={items.title} />
          </div>
          <div className="md:w-2/3">
            <h2 className="font-bold">{items.title}</h2>
            {items.store && (
              <span className="block text-sm text-muted-foreground">
                {items.store}
              </span>
            )}
            {items.type && (
              <span className="block text-sm text-muted-foreground">
                Type: {items.type}
              </span>
            )}
            <span className="text-lg text-highlight">
              {displayPrice(items.price)}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <MoreDetailsButton path={items.path} id={items.id} />
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

const MoveItemButton = () => {
  return (
    <Button className="block h-max w-max cursor-move p-0" variant="ghost">
      <span className="flex flex-col">
        <ChevronUp />
        <Grip />
        <ChevronDown />
      </span>
    </Button>
  );
};

// Helper Functions

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
