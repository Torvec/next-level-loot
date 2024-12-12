// This is called a redirect button because the api's provide a url or id that is used to then redirect to the actual deal or giveaway.

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { type RedirectButtonProps } from "@/types/types";

export default function RedirectButton({
  url,
  displayText,
}: RedirectButtonProps) {
  return (
    <Button
      asChild
      className="w-full bg-highlight text-highlight-foreground hover:bg-highlight-foreground hover:text-highlight"
    >
      <a href={url} target="_blank" rel="noopener noreferrer external">
        {displayText}
        <ExternalLink />
      </a>
    </Button>
  );
}
