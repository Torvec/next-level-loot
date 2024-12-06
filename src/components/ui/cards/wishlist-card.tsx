"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/cards/card";
import { Button } from "@/components/ui/buttons/button";
import { useWishlistDispatch } from "@/components/providers/wishlist-provider";

export default function WishlistCard({
  index,
  item,
}: {
  index: number;
  item: string;
}) {
  const dispatch = useWishlistDispatch();

  return (
    <Card className="rounded-xl border-muted">
      <CardHeader>
        <CardDescription></CardDescription>
        <CardTitle>{item}</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <Button
          onClick={() => dispatch({ type: "REMOVE", index })}
          className="bg-destructive text-destructive-foreground hover:bg-destructive-foreground hover:text-destructive"
        >
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
}
