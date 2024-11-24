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
      className="w-full bg-background text-muted-foreground hover:text-muted"
    >
      <Link href={`${path}${id}`}>
        More Details <ChevronRight />
      </Link>
    </Button>
  );
}
