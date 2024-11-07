export function initWishlist(key: string) {
  try {
    const wishlist = localStorage.getItem(key);
    if (!wishlist) localStorage.setItem(key, JSON.stringify([]));
  } catch (error) {
    console.error("Error initializing wishlist:", error);
  }
}

export function isWishlistEmpty(key: string) {
  try {
    const wishlist = localStorage.getItem(key);
    if (!wishlist) {
      initWishlist(key);
      return true;
    } else {
      return JSON.parse(wishlist).length === 0;
    }
  } catch (error) {
    console.error("Error checking if wishlist is empty:", error);
    return true; // Default to true in case of an error
  }
}

export function setWishlistItem(key: string, item: unknown) {
  try {
    const wishlist = localStorage.getItem(key);
    if (!wishlist) {
      initWishlist(key);
      localStorage.setItem(key, JSON.stringify([item]));
    } else {
      const newWishlist = [...JSON.parse(wishlist), item];
      localStorage.setItem(key, JSON.stringify(newWishlist));
    }
  } catch (error) {
    console.error("Error setting wishlist item:", error);
  }
}
export function getWishlist(key: string): string[] {
  try {
    const wishlist = localStorage.getItem(key);
    return wishlist ? JSON.parse(wishlist) : [];
  } catch (error) {
    console.error("Error getting wishlist:", error);
    return [];
  }
}

export function removeWishlistItem(key: string, index: number) {
  try {
    const wishlist = localStorage.getItem(key);
    if (wishlist) {
      const wishlistArray = JSON.parse(wishlist);
      // This creates a new array by combining all elements from the beginning of the array to the index specified
      // and all elements from the index specified plus one to the end of the array
      const newWishlistArray = [
        ...wishlistArray.slice(0, index),
        ...wishlistArray.slice(index + 1),
      ];
      localStorage.setItem(key, JSON.stringify(newWishlistArray));
    } else {
      console.error("Wishlist not found");
    }
  } catch (error) {
    console.error("Error removing wishlist item:", error);
  }
}

export function clearWishlist(key: string) {
  try {
    const wishlist = localStorage.getItem(key);
    if (wishlist) localStorage.setItem(key, JSON.stringify([]));
    else console.error("Wishlist not found");
  } catch (error) {
    console.error("Error clearing wishlist:", error);
  }
}
