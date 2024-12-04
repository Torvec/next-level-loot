import { useState, useEffect } from "react";
import { useWishlist } from "@/components/providers/wishlist-provider";

export default function useIsInWishlist(title: string) {
  const wishlist = useWishlist();
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    setIsInWishlist(wishlist.includes(title));
  }, [wishlist, title]);

  return isInWishlist;
}
