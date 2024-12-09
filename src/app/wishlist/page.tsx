"use client";

import { Button } from "@/components/ui/buttons/button";
import {
  useWishlist,
  useWishlistDispatch,
} from "@/components/providers/wishlist-provider";
import WishlistCard from "@/app/wishlist/wishlist-card";
import Link from "next/link";

export default function Wishlist() {
  const wishlist = useWishlist();
  const wishlistIsEmpty = wishlist.length === 0;

  return (
    <>
      <h1 className="py-32 text-center text-4xl">Wishlist</h1>
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

const EmptyWishlist = () => {
  return (
    <>
      <div className="mb-32 space-y-2 rounded-xl border-2 border-muted py-32 text-center">
        <h2 className="text-2xl font-semibold">Your Wishlist is Empty =/</h2>
        <p className="text-lg text-muted-foreground">
          Check out the{" "}
          <Link href={"/deals"} className="text-highlight hover:underline">
            Deals
          </Link>
          ,{" "}
          <Link href={"/games"} className="text-highlight hover:underline">
            Games
          </Link>
          , and{" "}
          <Link href={"/giveaways"} className="text-highlight hover:underline">
            Giveaways
          </Link>{" "}
          for games to add here.
        </p>
      </div>
    </>
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
