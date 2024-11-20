"use client";

import { useWishlistDispatch } from "@/lib/wishlist-provider";
import useIsInWishlist from "@/lib/use-is-in-wishlist";
import { Button } from "./button";

export default function WishlistButton({ title }: { title: string }) {
  const dispatch = useWishlistDispatch();
  const isInWishlist = useIsInWishlist(title);

  return (
    <Button
      onClick={() => dispatch({ type: "ADD", item: title })}
      className="w-full bg-gold text-background hover:bg-gold-foreground"
      disabled={isInWishlist}
    >
      {isInWishlist ? "In Wishlist" : "+ Wishlist"}
    </Button>
  );
}
