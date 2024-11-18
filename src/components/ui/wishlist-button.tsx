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
      className="w-full bg-yellow-500 text-background hover:bg-yellow-300"
      disabled={isInWishlist}
    >
      {isInWishlist ? "In Wishlist" : "+ Wishlist"}
    </Button>
  );
}
