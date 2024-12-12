"use client";

import { createContext, useReducer, useEffect, useContext } from "react";
import { type WishlistItemType, type WishlistAction } from "@/types/types";

const WishlistContext = createContext<WishlistItemType[]>([]);
const WishlistDispatchContext = createContext<React.Dispatch<WishlistAction>>(
  () => {},
);

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
    const storedWishlist = initWishlist("wishlist");
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

export function useWishlist() {
  return useContext(WishlistContext);
}

export function useWishlistDispatch() {
  return useContext(WishlistDispatchContext);
}

function wishlistReducer(state: WishlistItemType[], action: WishlistAction) {
  switch (action.type) {
    case "INIT":
      return action.payload || [];
    case "ADD":
      const updatedAddState = [...state, action.item!];
      localStorage.setItem("wishlist", JSON.stringify(updatedAddState));
      return updatedAddState;
    case "REMOVE":
      const updatedRemoveState = state.filter((_, i) => i !== action.index);
      localStorage.setItem("wishlist", JSON.stringify(updatedRemoveState));
      return updatedRemoveState;
    case "CLEAR":
      localStorage.removeItem("wishlist");
      return [];
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

function initWishlist(key: string): WishlistItemType[] {
  const storedWishlist = localStorage.getItem(key);
  return storedWishlist ? JSON.parse(storedWishlist) : [];
}
