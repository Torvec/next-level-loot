import { Button } from "./button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function FindDealsButton() {
  return (
    <Button
      asChild
      className="w-full bg-gold-foreground hover:bg-foreground hover:text-background"
    >
      <Link href={"/best-deals"}>
        Find Deals
        <ChevronRight />
      </Link>
    </Button>
  );
}
