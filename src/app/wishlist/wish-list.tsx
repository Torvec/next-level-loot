"use client";

import { useState } from "react";
import Link from "next/link";
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

export default function Wishlist() {
  const wishlist = useWishlist();
  const wishlistIsEmpty = wishlist.length === 0;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useWishlistDispatch();

  return (
    <>
      {wishlistIsEmpty ? (
        <section className="space-y-4 rounded-xl border-2 border-muted px-4 py-16 text-center md:py-32">
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
            <Link
              href={"/giveaways"}
              className="text-highlight hover:underline"
            >
              Giveaways
            </Link>{" "}
            for games to add here.
          </p>
        </section>
      ) : (
        <div className="space-y-4">
          {wishlist.map((items, index) => (
            <WishlistCard key={items.id} item={items} index={index} />
          ))}
        </div>
      )}
      <div className="flex justify-center">
        <Button
          className="bg-destructive text-destructive-foreground hover:bg-destructive-foreground hover:text-destructive"
          disabled={wishlistIsEmpty}
          onClick={() => setIsDialogOpen(true)}
        >
          Clear Wishlist
        </Button>
      </div>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
    </>
  );
}
