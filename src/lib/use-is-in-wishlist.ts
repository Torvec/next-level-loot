import { useState, useEffect } from "react";
import { useWishlist } from "@/components/providers/wishlist-provider";

export default function useIsInWishlist(id: string | number) {
  const wishlist = useWishlist();
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    // Use `some` to check if at least one item in the wishlist has the matching id.
    // `some` returns a boolean, which is exactly what we need for `isInWishlist`.
    // This comment brought to you by my past self cause i know my future self will look at this and go 'wtf is this??'
    setIsInWishlist(wishlist.some((item) => item.id === id));
  }, [wishlist, id]);

  return isInWishlist;
}
