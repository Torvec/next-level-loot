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
import Link from "next/link";
import { useState } from "react";
import { WishlistItemType } from "@/types/types";

// TODO: Sort by title, price, user's rank
// TODO: Undo remove item

// Main Component

export default function Wishlist() {
  const wishlist = useWishlist();
  const wishlistIsEmpty = wishlist.length === 0;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="mx-auto my-8 max-w-4xl space-y-8">
      <Sort />
      {wishlistIsEmpty ? (
        <EmptyWishlist />
      ) : (
        <WishlistCards wishlist={wishlist} />
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

const Sort = () => {
  return (
    <Popover>
      <PopoverTrigger className="rounded-lg bg-muted-foreground px-4 py-2">
        Sort
      </PopoverTrigger>
      <PopoverContent align="start">
        <SortList />
      </PopoverContent>
    </Popover>
  );
};

// const SortButton = () => {
//   return <Button className="bg-muted-foreground">Sort</Button>;
// };

const SortList = () => {
  const sortOptions = [
    { name: "Title", value: "title" },
    { name: "Price", value: "price" },
    { name: "Manual", value: "manual" },
  ];

  return (
    <ul className="space-y-2">
      {sortOptions.map((option) => (
        <li key={option.value}>
          <Link href={`?sort=${option.value}`}>{option.name}</Link>
        </li>
      ))}
    </ul>
  );
};

const WishlistCards = ({ wishlist }: { wishlist: WishlistItemType[] }) => {
  return (
    <div className="space-y-4">
      {wishlist.map((item, index) => (
        <WishlistCard
          key={item.id}
          title={item.title}
          src={item.src}
          path={item.path}
          store={item.store}
          type={item.type}
          price={item.price}
          index={index}
          id={item.id}
        />
      ))}
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
