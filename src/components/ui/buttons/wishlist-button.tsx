"use client";

import { useWishlistDispatch } from "@/components/providers/wishlist-provider";
import useIsInWishlist from "@/lib/use-is-in-wishlist";
import { Button } from "./button";
import { BookmarkPlus } from "lucide-react";
import { type ItemType } from "@/components/providers/wishlist-provider";

export default function WishlistButton({ item }: { item: ItemType }) {
  const dispatch = useWishlistDispatch();
  const isInWishlist = useIsInWishlist(item.id);

  return (
    <Button
      onClick={() =>
        dispatch({
          type: "ADD",
          item: {
            id: item.id,
            title: item.title,
            src: item.src,
            path: item.path,
            price: item.price,
          },
        })
      }
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
