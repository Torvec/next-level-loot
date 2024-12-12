import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CircleChevronRight } from "lucide-react";
import { type DetailsButtonProps } from "@/types/types";

export default function DetailsButton({ path, id }: DetailsButtonProps) {
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
