import { Button } from "./button";
import Link from "next/link";
import { CircleChevronRight } from "lucide-react";

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
        Details <CircleChevronRight />
      </Link>
    </Button>
  );
}
