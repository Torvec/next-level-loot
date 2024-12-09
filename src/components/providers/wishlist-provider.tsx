"use client";

import { createContext, useReducer, useEffect, useContext } from "react";

export type ItemType = {
  id: string | number;
  title: string;
  src: string;
  path: string;
  price?: string | number;
};

const WishlistContext = createContext<ItemType[]>([]);
const WishlistDispatchContext = createContext<
  React.Dispatch<{
    type: string;
    item?: ItemType;
    index?: number;
    payload?: ItemType[];
  }>
>(() => {});

export default function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlist, dispatch] = useReducer(wishlistReducer, [] as ItemType[]);

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

function wishlistReducer(
  state: ItemType[],
  action: {
    type: string;
    item?: ItemType;
    index?: number;
    payload?: ItemType[];
  },
) {
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

function initWishlist(key: string): ItemType[] {
  const storedWishlist = localStorage.getItem(key);
  return storedWishlist ? JSON.parse(storedWishlist) : [];
}
