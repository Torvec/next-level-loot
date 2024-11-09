import { useState, useEffect } from "react";
import { useWishlist } from "@/lib/wishlist-provider";

export default function useIsInWishlist(title: string) {
  const wishlist = useWishlist();
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    setIsInWishlist(wishlist.includes(title));
  }, [wishlist, title]);

  return isInWishlist;
}
