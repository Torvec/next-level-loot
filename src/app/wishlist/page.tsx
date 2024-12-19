import type { Metadata } from "next";
import Sort from "./sort";
import Wishlist from "./wish-list";

export const metadata: Metadata = {
  title: "Wishlist | Next Level Loot",
  description: "Check out your wishlist on Next Level Loot!",
};

// Main Component

export default function Page() {
  return (
    <div className="mx-auto my-8 max-w-4xl space-y-8 px-4 xl:px-0">
      <Sort />
      <Wishlist />
    </div>
  );
}
