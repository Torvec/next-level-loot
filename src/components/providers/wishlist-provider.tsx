"use client";

import { createContext, useReducer, useEffect, useContext } from "react";
import { type WishlistItemType, type WishlistAction } from "@/types/types";

const WishlistContext = createContext<WishlistItemType[]>([]);
const WishlistDispatchContext = createContext<React.Dispatch<WishlistAction>>(
  () => {},
);
const STORE = "wishlist";
const STORE_SORT = "wishlist_sort";

// Main Component

export default function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlist, dispatch] = useReducer(
    wishlistReducer,
    [] as WishlistItemType[],
  );

  useEffect(() => {
    const storedWishlist = initWishlist(STORE);
    dispatch({ type: "INIT", payload: storedWishlist });
    getCurrentSort();
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
      localStorage.removeItem(STORE_SORT);
      return [];
    case "SORT-BY-TITLE":
      const sortedByTitle = sortWishlistByTitle(state);
      localStorage.setItem(STORE, JSON.stringify(sortedByTitle));
      localStorage.setItem(STORE_SORT, "Title");
      return sortedByTitle;
    case "SORT-BY-PRICE":
      const sortedByPrice = sortWishlistByPrice(state);
      localStorage.setItem(STORE, JSON.stringify(sortedByPrice));
      localStorage.setItem(STORE_SORT, "Price");
      return sortedByPrice;
    case "SORT-BY-DATE-ADDED":
      const sortedByDateAdded = sortWishlistByDateAdded(state);
      localStorage.setItem(STORE, JSON.stringify(sortedByDateAdded));
      localStorage.setItem(STORE_SORT, "Added");
      return sortedByDateAdded;
    default:
      throw new Error("Unknown action: " + action.type);
  }
};

// Utility functions

const initWishlist = (key: string): WishlistItemType[] => {
  const storedWishlist = localStorage.getItem(key);
  return storedWishlist ? JSON.parse(storedWishlist) : [];
};

const sortWishlistByTitle = (
  wishlist: WishlistItemType[],
): WishlistItemType[] => {
  return [...wishlist].sort((a, b) => a.title.localeCompare(b.title));
};

const sortWishlistByPrice = (
  wishlist: WishlistItemType[],
): WishlistItemType[] => {
  return [...wishlist].sort(
    (a, b) => convertPrice(a.price) - convertPrice(b.price),
  );
};

const sortWishlistByDateAdded = (
  wishlist: WishlistItemType[],
): WishlistItemType[] => {
  return [...wishlist].sort((a, b) => a.timestamp - b.timestamp);
};

const convertPrice = (price: string | number | undefined): number => {
  if (price === undefined) {
    return Infinity;
  }
  if (price === "Free") {
    return 0;
  }
  return Number(price);
};

export const getCurrentSort = (): string => {
  return localStorage.getItem(STORE_SORT) || "Added";
};
