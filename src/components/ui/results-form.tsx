"use client";

import Form from "next/form";
import { query } from "@/lib/query";
import SelectBox from "@/components/ui/select-box";
import SearchInput from "@/components/ui/search-input";
import { Button } from "@/components/ui/buttons/button";
import { type Category } from "@/lib/types";

export default function ResultsForm({ category }: { category: Category }) {
  const { sort, order, filters, search } = query[category].queryParams;

  return (
    <div className="flex flex-wrap items-end justify-between gap-2">
      <Form
        action={""}
        className="flex flex-col gap-4 lg:flex-row lg:items-end"
      >
        {sort && (
          <div>
            <span className="block text-sm text-muted-foreground">Sort</span>
            <SelectBox
              name={sort.name}
              placeholder={sort.placeholder}
              options={sort.options}
            />
          </div>
        )}
        {order && (
          <div>
            <span className="block text-sm text-muted-foreground">Order</span>
            <SelectBox
              name={order.name}
              placeholder={order.placeholder}
              options={order.options}
            />
          </div>
        )}
        {filters && (
          <div>
            <span className="block text-sm text-muted-foreground">Filter</span>
            <div className="flex flex-col items-center gap-2 lg:flex-row">
              {filters.map(({ name, placeholder, options }) => (
                <SelectBox
                  key={name}
                  name={name}
                  placeholder={placeholder}
                  options={options}
                />
              ))}
            </div>
          </div>
        )}
        <Button
          type="submit"
          className="w-full max-w-64 bg-muted text-muted-foreground"
        >
          Apply
        </Button>
      </Form>
      {search && <SearchInput placeholder={search.placeholder} />}
    </div>
  );
}
