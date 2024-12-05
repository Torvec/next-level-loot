"use client";

import Link from "next/link";
import { query } from "@/lib/query";
import { Button } from "@/components/ui/buttons/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ChevronUp } from "lucide-react";
import { type Category } from "@/lib/types";

// How this SHOULD work:
// Instead of using select boxes, there will be a series of popover menus with list items that can be selected/unselected and will have some kind of icon to show when it is selected
// When a user clicks on ANY item it will automatically apply the filter and update the results, if they click on that item again it will remove the filter and update the results
// The url and active filters should be in sync at all times, so if a user refreshes the page or shares the url it will show the same results or if a user changes the url directly it will update the results (assuming it is a valid url)
// whenever a filter is added it will show up below the menu as a pill with an x to remove it, if a user clicks on the x it will remove the filter and update the results
// The clear all filters button will be on the same line as the pills and only show up when there are filters applied
// On mobile view all of the filter and sort items will be within a single slide out menu that will have alll of the same functionality as the desktop view except any selected filters will be at the top of the menu and the clear all filters button will be there also

// export default function ResultsForm({ category }: { category: Category }) {
//   const { sort, order, filters } = query[category].queryParams;

//   return (
//     <div className="flex flex-col gap-4">
//       <Form
//         action={""}
//         className="flex flex-col gap-4 lg:flex-row lg:items-end"
//       >
//         {sort && (
//           <div>
//             <span className="block text-sm text-muted-foreground">Sort</span>
//             <SelectBox
//               name={sort.name}
//               placeholder={sort.placeholder}
//               options={sort.options}
//             />
//           </div>
//         )}
//         {order && (
//           <div>
//             <span className="block text-sm text-muted-foreground">Order</span>
//             <SelectBox
//               name={order.name}
//               placeholder={order.placeholder}
//               options={order.options}
//             />
//           </div>
//         )}
//         {filters && (
//           <div>
//             <span className="block text-sm text-muted-foreground">Filter</span>
//             <div className="flex flex-col items-center gap-2 lg:flex-row">
//               {filters.map(({ name, placeholder, options }) => (
//                 <SelectBox
//                   key={name}
//                   name={name}
//                   placeholder={placeholder}
//                   options={options}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//         <Button
//           type="submit"
//           className="w-full max-w-64 bg-muted text-muted-foreground"
//         >
//           Apply
//         </Button>
//       </Form>
//     </div>
//   );
// }

export default function ResultsForm({ category }: { category: Category }) {
  const { sort, order, filters } = query[category].queryParams;

  return (
    <div className="flex flex-col justify-between gap-2 md:flex-row">
      {filters && (
        <div>
          <div className="flex flex-col gap-2 md:flex-row">
            {filters.map((filter) => (
              <Popover key={filter.name}>
                <PopoverTrigger asChild>
                  <Button className="w-full min-w-32 bg-muted-foreground">
                    {filter.placeholder}
                    <ChevronUp />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="max-h-96 w-[calc(100vw-32px)] overflow-y-auto md:w-max"
                >
                  <ul>
                    {filter.options.map((option) => (
                      <li key={option.value}>
                        <Link
                          href={"?" + filter.name + "=" + option.value}
                          className="block px-2 py-1 hover:bg-muted"
                        >
                          {option.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </PopoverContent>
              </Popover>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2 md:flex-row">
        {sort && (
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button className="w-full min-w-32 bg-muted-foreground">
                  {sort.placeholder}
                  <ChevronUp />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="max-h-96 w-[calc(100vw-32px)] overflow-y-auto md:w-max"
              >
                <ul>
                  {sort.options.map((option) => (
                    <li key={option.value}>
                      <Link
                        href={"?" + sort.name + "=" + option.value}
                        className="block px-2 py-1 hover:bg-muted"
                      >
                        {option.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        )}
        {order && (
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button className="w-full min-w-32 bg-muted-foreground">
                  {order.placeholder}
                  <ChevronUp />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="max-h-96 w-[calc(100vw-32px)] overflow-y-auto md:w-max"
              >
                <ul>
                  {order.options.map((option) => (
                    <li key={option.value}>
                      <Link
                        href={"?" + order.name + "=" + option.value}
                        className="block px-2 py-1 hover:bg-muted"
                      >
                        {option.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </div>
  );
}

// Filters Form -> Can select multiple options at a time

// Sort Form -> Can only select one option at a time

// Button with popover menu

// List of items with icons

// List of Pills with x to remove added whenever a filter is applied

// Clear all filters button added at end of list when there are filters applied
