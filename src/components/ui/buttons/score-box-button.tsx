import { Button } from "@/components/ui/buttons/button";

export default function ScoreBoxButton({
  apiLink,
  title,
  score,
  reviewSourceName,
  reviewSourceBaseURL,
  reviewSourceSearch,
}: {
  title: string;
  apiLink?: string;
  score: string | number | null;
  reviewSourceName: string;
  reviewSourceBaseURL: string;
  reviewSourceSearch: string;
}) {
  const encodedTitle = encodeURIComponent(title);
  return (
    <Button
      asChild
      variant="outline"
      className="flex h-max w-full flex-col border border-muted bg-transparent"
    >
      <a
        href={
          apiLink
            ? `${reviewSourceBaseURL}${apiLink}`
            : `${reviewSourceSearch}${encodedTitle}`
        }
        target="_blank"
        rel="noopener noreferrer external"
      >
        <span className="block text-2xl font-bold text-muted-foreground">
          {score !== "0" && score !== 0 && score !== null ? score + "%" : "N/A"}
        </span>
        <span className="block text-sm text-muted-foreground">
          {reviewSourceName}
        </span>
      </a>
    </Button>
  );
}
