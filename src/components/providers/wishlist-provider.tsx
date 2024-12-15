"use client";

import { createContext, useReducer, useEffect, useContext } from "react";
import { type WishlistItemType, type WishlistAction } from "@/types/types";

const WishlistContext = createContext<WishlistItemType[]>([]);
const WishlistDispatchContext = createContext<React.Dispatch<WishlistAction>>(
  () => {},
);
const STORE = "wishlist";

// Main Component

export default function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlist, dispatch] = useReducer(wishlistReducer, []);

  useEffect(() => {
    const storedWishlist = initWishlist(STORE);
    dispatch({ type: "INIT", payload: storedWishlist });
  }, []);

  return (
    <WishlistContext.Provider value={wishlist}>
      <WishlistDispatchContext.Provider value={dispatch}>
        {children}
      </WishlistDispatchContext.Provider>
    </WishlistContext.Provider>
  );
}

// Sub-Components

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const useWishlistDispatch = () => {
  return useContext(WishlistDispatchContext);
};

const wishlistReducer = (state: WishlistItemType[], action: WishlistAction) => {
  switch (action.type) {
    case "INIT":
      return action.payload || [];
    case "ADD":
      const updatedAddState = [...state, action.item!];
      localStorage.setItem(STORE, JSON.stringify(updatedAddState));
      return updatedAddState;
    case "REMOVE":
      const updatedRemoveState = state.filter((_, i) => i !== action.index);
      localStorage.setItem(STORE, JSON.stringify(updatedRemoveState));
      return updatedRemoveState;
    case "CLEAR":
      localStorage.removeItem(STORE);
      return [];
    case "SORT-BY-TITLE":
      const sortedByTitle = sortWishlistByTitle(state);
      localStorage.setItem(STORE, JSON.stringify(sortedByTitle));
      return sortedByTitle;
    case "SORT-BY-PRICE":
      const sortedByPrice = sortWishlistByPrice(state);
      localStorage.setItem(STORE, JSON.stringify(sortedByPrice));
      return sortedByPrice;
    case "SORT-BY-DATE-ADDED":
      const sortedByDateAdded = sortWishlistByDateAdded(state);
      localStorage.setItem(STORE, JSON.stringify(sortedByDateAdded));
      return sortedByDateAdded;
    default:
      throw new Error("Unknown action: " + action.type);
  }
};

// Utility functions

const initWishlist = (key: string) => {
  const storedWishlist = localStorage.getItem(key);
  return storedWishlist ? JSON.parse(storedWishlist) : [];
};

const sortWishlistByTitle = (wishlist: WishlistItemType[]) => {
  return [...wishlist].sort((a, b) => a.title.localeCompare(b.title));
};

const sortWishlistByPrice = (wishlist: WishlistItemType[]) => {
  return [...wishlist].sort(
    (a, b) => convertPrice(a.price) - convertPrice(b.price),
  );
};

const sortWishlistByDateAdded = (wishlist: WishlistItemType[]) => {
  return [...wishlist].sort((a, b) => a.timestamp - b.timestamp);
};

const convertPrice = (price: string | number | undefined) => {
  if (price === undefined) {
    return Infinity;
  }
  if (price === "Free") {
    return 0;
  }
  return Number(price);
};
