"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWishlistDispatch } from "@/lib/wishlist-provider";

export default function WishlistCard({
  index,
  item,
}: {
  index: number;
  item: string;
}) {
  const dispatch = useWishlistDispatch();

  return (
    <Card className="rounded-xl border-neutral-700">
      <CardHeader>
        <CardDescription></CardDescription>
        <CardTitle>{item}</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <Button
          onClick={() => dispatch({ type: "REMOVE", index })}
          className="bg-red-500 text-white"
        >
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
}
