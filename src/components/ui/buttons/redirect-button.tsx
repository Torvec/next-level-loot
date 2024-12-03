// This is called a redirect button because the api's provide a url or id that is used to then redirect to the actual deal or giveaway.

import { Button } from "./button";
import { ExternalLink } from "lucide-react";

export default function GiveawayButton({
  url,
  text,
}: {
  url: string;
  text: string;
}) {
  return (
    <Button
      asChild
      className="w-full bg-highlight text-highlight-foreground hover:bg-highlight-foreground hover:text-highlight"
    >
      <a href={url} target="_blank" rel="noopener noreferrer external">
        {text}
        <ExternalLink />
      </a>
    </Button>
  );
}
