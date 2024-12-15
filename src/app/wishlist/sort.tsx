"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  useWishlistDispatch,
  useWishlist,
} from "@/components/providers/wishlist-provider";
import { ArrowDownUp } from "lucide-react";

export default function Sort() {
  const wishlist = useWishlist();
  const wishlistIsEmpty = wishlist.length === 0;
  const dispatch = useWishlistDispatch();

  const sortOptions = [
    { name: "Title", dispatch: "SORT-BY-TITLE" },
    { name: "Price", dispatch: "SORT-BY-PRICE" },
    { name: "Added", dispatch: "SORT-BY-DATE-ADDED" },
  ];

  return (
    <Popover>
      <PopoverTrigger
        className="flex items-center gap-2 rounded-lg bg-muted-foreground px-4 py-2 text-sm text-muted hover:bg-foreground disabled:bg-muted disabled:text-muted-foreground/50"
        disabled={wishlistIsEmpty}
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
}
