import { Button } from "@/components/ui/button";
import { type ScoreBoxButtonProps } from "@/types/types";

export default function ScoreBoxButton({
  apiLink,
  title,
  score,
  reviewSourceName,
  reviewSourceBaseURL,
  reviewSourceSearch,
}: ScoreBoxButtonProps) {
  const encodedTitle = encodeURIComponent(title);

  const createLink = apiLink
    ? `${reviewSourceBaseURL}${apiLink}`
    : `${reviewSourceSearch}${encodedTitle}`;

  const displayScore = score !== "0" && score !== 0 && score !== null ? score + "%" : "N/A";

  return (
    <Button
      asChild
      variant="outline"
      className="flex h-full w-full flex-col border-2 border-muted bg-transparent"
    >
      <a href={createLink} target="_blank" rel="noopener noreferrer external">
        <span className="block text-2xl font-bold text-muted-foreground">{displayScore}</span>
        <span className="block text-sm text-muted-foreground">{reviewSourceName}</span>
      </a>
    </Button>
  );
}
