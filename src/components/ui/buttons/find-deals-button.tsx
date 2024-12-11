import Form from "next/form";
import { Button } from "@/components/ui/button";
import { BadgeDollarSign } from "lucide-react";

export default function FindDealsButton({ title }: { title: string }) {
  return (
    <Form action={"/deals"} className="w-full">
      <input type="hidden" name="searchTerm" value={title} />
      <Button
        type="submit"
        className="w-full bg-highlight text-highlight-foreground hover:bg-highlight-foreground hover:text-highlight"
      >
        <BadgeDollarSign />
        Deals
      </Button>
    </Form>
  );
}
