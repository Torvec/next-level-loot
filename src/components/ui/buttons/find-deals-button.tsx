import Form from "next/form";
import { Button } from "./button";
import { BadgeDollarSign } from "lucide-react";

export default function FindDealsButton({ title }: { title: string }) {
  return (
    <Form action={"/best-deals"} className="w-full">
      <input type="hidden" name="searchTerm" value={title} />
      <Button
        type="submit"
        className="w-full bg-gold-foreground hover:bg-foreground hover:text-background"
      >
        <BadgeDollarSign />
        Deals
      </Button>
    </Form>
  );
}
