"use client";

import Form from "next/form";
import { query } from "@/lib/query";
import SelectBox from "@/components/ui/select-box";
import { Button } from "@/components/ui/buttons/button";
import { type Category } from "@/lib/types";

// How this SHOULD work:
// Instead of using select boxes, there will be a series of popover menus with list items that can be selected/unselected and will have some kind of icon to show when it is selected
// When a user clicks on ANY item it will automatically apply the filter and update the results, if they click on that item again it will remove the filter and update the results
// The url and active filters should be in sync at all times, so if a user refreshes the page or shares the url it will show the same results or if a user changes the url directly it will update the results (assuming it is a valid url)
// whenever a filter is added it will show up below the menu as a pill with an x to remove it, if a user clicks on the x it will remove the filter and update the results
// The clear all filters button will be on the same line as the pills and only show up when there are filters applied
// On mobile view all of the filter and sort items will be within a single slide out menu that will have alll of the same functionality as the desktop view except any selected filters will be at the top of the menu and the clear all filters button will be there also
//* Stretch Goal: the filters will fetch new data but sort will just re-order the data that is already fetched

export default function ResultsForm({ category }: { category: Category }) {
  const { sort, order, filters } = query[category].queryParams;

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
    </div>
  );
}
