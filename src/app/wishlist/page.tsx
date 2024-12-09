/* eslint-disable @next/next/no-img-element */
"use client";

import { X, Grip, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/buttons/button";
import {
  useWishlist,
  useWishlistDispatch,
} from "@/components/providers/wishlist-provider";
import MoreDetailsButton from "@/components/ui/buttons/more-details-button";
import { type ItemType } from "@/components/providers/wishlist-provider";

export default function Wishlist() {
  const wishlist = useWishlist();
  const wishlistIsEmpty = wishlist.length === 0;

  return (
    <>
      <h1 className="py-32 text-center text-4xl font-bold uppercase">
        My Wishlist
      </h1>
      {wishlistIsEmpty ? (
        <EmptyWishlist />
      ) : (
        <div className="space-y-4">
          {wishlist.map((item, index) => (
            <WishlistCard
              key={item.id}
              title={item.title}
              src={item.src}
              path={item.path}
              price={item.price}
              index={index}
              id={item.id}
            />
          ))}
        </div>
      )}
      <ClearWishlist isWishListEmpty={wishlistIsEmpty} />
    </>
  );
}

const WishlistCard = ({
  id,
  title,
  src,
  path,
  price,
  index,
}: ItemType & { index: number }) => {
  return (
    <section className="mx-auto flex max-w-4xl items-center gap-4 rounded-xl border bg-muted p-6">
      <MoveItemButton />
      <div className="flex w-full flex-col gap-4 md:flex-row md:justify-between">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <img
            src={src}
            alt={title}
            className="h-24 w-32 rounded-xl border bg-foreground"
          />
          <div className="space-y-2">
            <h2 className="font-bold">{title}</h2>
            <HandlePrice price={price} />
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <MoreDetailsButton path={path} id={id} />
          <RemoveItemButton index={index} />
        </div>
      </div>
    </section>
  );
};

const HandlePrice = ({ price }: { price: string | undefined | number }) => {
  let displayPrice = "";

  if (!price) {
    displayPrice = "";
  } else if (price === "0.00" || price === "Free") {
    displayPrice = "FREE!";
  } else {
    displayPrice = `$${price}`;
  }

  return (
    <span className="block text-lg text-muted-foreground">{displayPrice}</span>
  );
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

const EmptyWishlist = () => {
  return (
    <p className="mb-32 border border-muted py-32 text-center text-2xl font-semibold">
      Your Wishlist is Empty
    </p>
  );
};

const ClearWishlist = ({ isWishListEmpty }: { isWishListEmpty: boolean }) => {
  const dispatch = useWishlistDispatch();

  return (
    <div className="my-32 flex justify-center">
      <Button
        onClick={() => dispatch({ type: "CLEAR" })}
        className="bg-destructive text-destructive-foreground hover:bg-destructive-foreground hover:text-destructive"
        disabled={isWishListEmpty}
      >
        Clear Wishlist
      </Button>
    </div>
  );
};
