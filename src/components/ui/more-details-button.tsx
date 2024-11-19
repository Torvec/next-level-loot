import { Button } from "./button";
import Link from "next/link";

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
      className="w-full bg-background text-foreground hover:bg-muted-foreground hover:text-muted"
    >
      <Link href={`${path}${id}`}>More Details -&gt;</Link>
    </Button>
  );
}
