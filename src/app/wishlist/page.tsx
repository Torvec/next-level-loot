"use client";

import {
  initWishlist,
  isWishlistEmpty,
  getWishlist,
  removeWishlistItem,
} from "@/lib/wishlist";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Wishlist() {
  initWishlist("wishlist");
  const wishlistItems = getWishlist("wishlist");
  return (
    <>
      <h1 className="py-32 text-center text-4xl font-bold uppercase">
        My Wishlist
      </h1>
      {isWishlistEmpty("wishlist") ? (
        <p>Is empty</p>
      ) : (
        <div className="grid grid-cols-3 gap-8">
          {wishlistItems.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardDescription></CardDescription>
                <CardTitle>{item}</CardTitle>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter>
                <Button
                  onClick={() => removeWishlistItem("wishlist", index)}
                  className="bg-red-500 text-white"
                >
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
