"use client";

import { useWishlistDispatch } from "@/components/providers/wishlist-provider";
import useIsInWishlist from "@/lib/use-is-in-wishlist";
import { Button } from "@/components/ui/button";
import { BookmarkPlus, BookmarkCheck } from "lucide-react";
import { type WishlistItemType } from "@/types/types";

export default function WishlistButton({ item }: { item: WishlistItemType }) {
  const dispatch = useWishlistDispatch();

  const isInWishlist = useIsInWishlist(item.id);
  const content = isInWishlist ? (
    <>
      <BookmarkCheck /> Added
    </>
  ) : (
    <>
      <BookmarkPlus /> Wishlist
    </>
  );

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
            store: item.store,
            type: item.type,
            price: item.price,
          },
        })
      }
      className="w-full bg-background text-muted-foreground hover:text-muted"
      disabled={isInWishlist}
    >
      {content}
    </Button>
  );
}
