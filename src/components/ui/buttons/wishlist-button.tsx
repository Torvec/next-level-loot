"use client";

import { useWishlistDispatch } from "@/components/providers/wishlist-provider";
import useIsInWishlist from "@/lib/use-is-in-wishlist";
import { Button } from "./button";
import { BookmarkPlus } from "lucide-react";

export default function WishlistButton({ title }: { title: string }) {
  const dispatch = useWishlistDispatch();
  const isInWishlist = useIsInWishlist(title);

  return (
    <Button
      onClick={() => dispatch({ type: "ADD", item: title })}
      className="w-full bg-background text-muted-foreground hover:text-muted"
      disabled={isInWishlist}
    >
      {isInWishlist ? (
        "In Wishlist"
      ) : (
        <>
          <BookmarkPlus /> Wishlist
        </>
      )}
    </Button>
  );
}
