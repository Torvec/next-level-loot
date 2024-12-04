"use client";

import { Button } from "@/components/ui/buttons/button";
import ResultsList from "@/components/ui/results-list";
import WishlistCard from "@/components/ui/cards/wishlist-card";
import {
  useWishlist,
  useWishlistDispatch,
} from "@/components/providers/wishlist-provider";

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
        <ResultsList>
          {wishlist.map((item, index) => (
            <WishlistCard key={index} item={item} index={index} />
          ))}
        </ResultsList>
      )}
      <ClearWishlist isWishListEmpty={wishlistIsEmpty} />
    </>
  );
}

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
