"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  useWishlist,
  useWishlistDispatch,
} from "@/components/providers/wishlist-provider";
import WishlistCard from "@/app/wishlist/wishlist-card";
import Link from "next/link";
import { useState } from "react";

export default function Wishlist() {
  const wishlist = useWishlist();
  const wishlistIsEmpty = wishlist.length === 0;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      <ClearWishlistButton
        isWishListEmpty={wishlistIsEmpty}
        onClick={() => setIsDialogOpen(true)}
      />
      <ClearWishlistDialog open={isDialogOpen} setOpen={setIsDialogOpen} />
    </>
  );
}

const EmptyWishlist = () => {
  return (
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
  );
};

const ClearWishlistButton = ({
  isWishListEmpty,
  onClick,
}: {
  isWishListEmpty: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="my-32 flex justify-center">
      <Button
        className="bg-destructive text-destructive-foreground hover:bg-destructive-foreground hover:text-destructive"
        disabled={isWishListEmpty}
        onClick={onClick}
      >
        Clear Wishlist
      </Button>
    </div>
  );
};

const ClearWishlistDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const dispatch = useWishlistDispatch();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete all of
            your wishlist items.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => dispatch({ type: "CLEAR" })}
            className="bg-destructive text-destructive-foreground hover:bg-destructive-foreground hover:text-destructive"
          >
            Clear
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
