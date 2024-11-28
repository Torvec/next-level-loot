"use client";

import Form from "next/form";
import { fetchOptions } from "@/lib/fetch";
import SelectBox from "@/components/ui/select-box";
import SearchInput from "@/components/ui/search-input";
import { Button } from "@/components/ui/buttons/button";
import { type Category } from "@/lib/types";

export default function ResultsForm({ category }: { category: Category }) {
  const { sort, filter, search } = fetchOptions[category];

  return (
    <div className="flex flex-wrap items-end justify-between gap-2">
      <Form action={""} className="flex flex-col gap-4 lg:flex-row">
        <div>
          <span className="block text-sm text-muted-foreground">Sort</span>
          <SelectBox
            defaultValue={sort[0].value}
            defaultName={sort[0].name}
            data={sort}
          />
        </div>
        <div>
          <span className="block text-sm text-muted-foreground">Filter</span>
          <div className="flex flex-col items-center gap-2 lg:flex-row">
            {filter.map((f) => (
              <SelectBox
                key={f.name}
                defaultValue={f.value[0].value}
                defaultName={f.value[0].name}
                data={f.value}
              />
            ))}
            <Button
              type="submit"
              className="w-full max-w-64 bg-muted text-muted-foreground"
            >
              Apply Filter
            </Button>
          </div>
        </div>
      </Form>
      {search && <SearchInput />}
    </div>
  );
}
