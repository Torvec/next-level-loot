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
              defaultValue={sort.options[0].value}
              defaultName={sort.options[0].name}
              options={sort.options}
            />
          </div>
        )}
        {order && (
          <div>
            <span className="block text-sm text-muted-foreground">Order</span>
            <SelectBox
              name={order.name}
              defaultValue={order.options[0].value}
              defaultName={order.options[0].name}
              options={order.options}
            />
          </div>
        )}
        {filters && (
          <div>
            <span className="block text-sm text-muted-foreground">Filter</span>
            <div className="flex flex-col items-center gap-2 lg:flex-row">
              {filters.map(({ name, options }) => (
                <SelectBox
                  key={name}
                  name={name}
                  defaultValue={options[0].value}
                  defaultName={options[0].name}
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
