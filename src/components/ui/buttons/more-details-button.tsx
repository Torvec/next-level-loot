import { Button } from "./button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function MoreDetailsButton({
  id,
  path,
}: {
  id: string | number;
  path: string;
}) {
  return (
    <Button
      asChild
      variant={"ghost"}
      className="w-full text-muted-foreground hover:bg-background"
    >
      <Link href={`${path}${id}`}>
        More Details <ChevronRight />
      </Link>
    </Button>
  );
}
