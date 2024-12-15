"use client";

import Link from "next/link";
import { useState } from "react";
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
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  useWishlist,
  useWishlistDispatch,
} from "@/components/providers/wishlist-provider";
import WishlistCard from "@/app/wishlist/wishlist-card";
import { ArrowDownUp } from "lucide-react";

// Main Component

export default function Wishlist() {
  const wishlist = useWishlist();
  const wishlistIsEmpty = wishlist.length === 0;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const sortOptions = [
    { name: "Title", dispatch: "SORT-BY-TITLE" },
    { name: "Price", dispatch: "SORT-BY-PRICE" },
    { name: "Added", dispatch: "SORT-BY-DATE-ADDED" },
  ];

  return (
    <div className="mx-auto my-8 max-w-4xl space-y-8">
      <Sort isWishlistEmpty={wishlistIsEmpty} sortOptions={sortOptions} />
      {wishlistIsEmpty ? (
        <EmptyWishlist />
      ) : (
        <div className="space-y-4">
          {wishlist.map((items, index) => (
            <WishlistCard key={items.id} item={items} index={index} />
          ))}
        </div>
      )}
      <ClearWishlistButton
        isWishListEmpty={wishlistIsEmpty}
        onClick={() => setIsDialogOpen(true)}
      />
      <ClearWishlistDialog open={isDialogOpen} setOpen={setIsDialogOpen} />
    </div>
  );
}

// Sub-Components

const EmptyWishlist = () => {
  return (
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
        <Link href={"/giveaways"} className="text-highlight hover:underline">
          Giveaways
        </Link>{" "}
        for games to add here.
      </p>
    </section>
  );
};

const Sort = ({
  sortOptions,
  isWishlistEmpty,
}: {
  sortOptions: Record<string, string>[];
  isWishlistEmpty: boolean;
}) => {
  const dispatch = useWishlistDispatch();

  return (
    <Popover>
      <PopoverTrigger
        className="flex items-center gap-2 rounded-lg bg-muted-foreground px-4 py-2 text-sm text-muted hover:bg-foreground disabled:bg-muted disabled:text-muted-foreground/50"
        disabled={isWishlistEmpty}
      >
        <ArrowDownUp size={18} />
        Sort
      </PopoverTrigger>
      <PopoverContent align="start">
        <ul>
          {sortOptions.map((option) => {
            return (
              <li key={option.name}>
                <Button
                  variant="ghost"
                  className="w-full justify-start rounded-none hover:bg-muted"
                  onClick={() => {
                    dispatch({ type: `${option.dispatch}` });
                  }}
                >
                  {option.name}
                </Button>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
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
    <div className="flex justify-center">
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
