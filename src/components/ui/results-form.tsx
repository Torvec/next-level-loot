"use client";

import { useState } from "react";
import { fetchOptions } from "@/lib/fetch";
import SelectBox from "@/components/ui/select-box";
import SearchInput from "@/components/ui/search-input";
import { Button } from "@/components/ui/buttons/button";
import { type Category } from "@/lib/types";

export default function ResultsForm({ category }: { category: Category }) {
  const { sort, filter, search } = fetchOptions[category];
  const [sortValue, setSortValue] = useState(sort[0].value);
  const [filters, setFilters] = useState(() =>
    filter.map((f) => ({
      filter: f.name,
      value: f.value[0].value,
    })),
  );

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prev) =>
      prev.map((f) => (f.filter === filterName ? { ...f, value } : f)),
    );
  };

  const applyFilters = () => {
    console.log("Applying filters:", filters, "Sort:", sortValue);
  };

  return (
    <div className="flex flex-wrap items-end justify-between gap-2">
      <form className="flex flex-col gap-4 lg:flex-row">
        <div>
          <span className="block text-sm text-muted-foreground">Sort</span>
          <SelectBox
            defaultValue={sort[0].value}
            defaultName={sort[0].name}
            data={sort}
            onValueChange={setSortValue}
          />
        </div>
        <div>
          <span className="block text-sm text-muted-foreground">Filter</span>
          <div className="flex flex-col items-center gap-2 lg:flex-row">
            {filter.map((f) => (
              <SelectBox
                key={f.name}
                defaultValue={
                  filters.find((fl) => fl.filter === f.name)?.value ||
                  f.value[0].value
                }
                defaultName={f.value[0].name}
                data={f.value}
                onValueChange={(value) => handleFilterChange(f.name, value)}
              />
            ))}
            <Button
              onClick={applyFilters}
              className="w-full max-w-64 bg-muted text-muted-foreground"
            >
              Apply Filter
            </Button>
          </div>
        </div>
      </form>
      {search && <SearchInput />}
    </div>
  );
}
