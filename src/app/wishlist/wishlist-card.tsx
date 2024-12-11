"use client";
/* eslint-disable @next/next/no-img-element */

import { Button } from "@/components/ui/button";
import MoreDetailsButton from "@/components/ui/buttons/more-details-button";
import BannerSection from "@/components/ui/banner-section";
import { X, Grip, ChevronUp, ChevronDown } from "lucide-react";
import {
  type ItemType,
  useWishlistDispatch,
} from "@/components/providers/wishlist-provider";

export default function WishlistCard({
  id,
  title,
  src,
  path,
  price,
  index,
}: ItemType & { index: number }) {
  return (
    <section className="mx-auto flex max-w-4xl items-center gap-4 rounded-xl bg-muted p-6">
      <MoveItemButton />
      <div className="flex w-full flex-col gap-6 md:flex-row md:justify-between">
        <div className="flex flex-col gap-6 md:flex-1 md:flex-row md:items-center">
          <div className="md:w-1/3">
            <BannerSection src={src} alt={title} />
          </div>
          <div className="md:w-2/3">
            <h2 className="font-bold">{title}</h2>
            <FormatPrice price={price} />
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <MoreDetailsButton path={path} id={id} />
          <RemoveItemButton index={index} />
        </div>
      </div>
    </section>
  );
}

const FormatPrice = ({ price }: { price: string | undefined | number }) => {
  let displayPrice = "";

  if (!price) {
    displayPrice = "";
  } else if (price === "0.00" || price === "Free") {
    displayPrice = "FREE!";
  } else {
    displayPrice = `$${price}`;
  }

  return <span className="text-lg text-muted-foreground">{displayPrice}</span>;
};

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
