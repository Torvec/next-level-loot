"use client";

import { Button } from "@/components/ui/buttons/button";
import ResultsList from "@/components/ui/results-list";
import WishlistCard from "./wishlist-card";
import { useWishlist, useWishlistDispatch } from "@/lib/wishlist-provider";

export default function Wishlist() {
  const wishlist = useWishlist();
  const wishlistIsEmpty = wishlist.length === 0;
  const dispatch = useWishlistDispatch();

  const EmptyWishlist = () => {
    return (
      <p className="mb-32 border border-muted py-32 text-center text-2xl font-semibold">
        Your Wishlist is Empty
      </p>
    );
  };

  const ClearWishlist = () => {
    return (
      <div className="mb-32 flex justify-center">
        <Button
          onClick={() => dispatch({ type: "CLEAR" })}
          className="bg-destructive text-destructive-foreground hover:bg-destructive-foreground hover:text-destructive"
          disabled={wishlistIsEmpty}
        >
          Clear Wishlist
        </Button>
      </div>
    );
  };

  return (
    <>
      <h1 className="py-32 text-center text-4xl font-bold uppercase">
        My Wishlist
      </h1>
      {wishlistIsEmpty ? (
        <EmptyWishlist />
      ) : (
        <ResultsList>
          {wishlist.map((item, index) => (
            <WishlistCard key={index} item={item} index={index} />
          ))}
        </ResultsList>
      )}
      <ClearWishlist />
    </>
  );
}
