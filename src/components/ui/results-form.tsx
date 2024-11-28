import { fetchOptions } from "@/lib/fetch";
import SelectBox from "@/components/ui/select-box";
import SearchInput from "@/components/ui/search-input";
import { Button } from "@/components/ui/buttons/button";
import { type Category } from "@/lib/types";

export default function ResultsForm({ category }: { category: Category }) {
  const sortBy = fetchOptions[category].sort;
  const filters = fetchOptions[category].filter;
  const getFilterDefaults = filters.map((filter) => {
    const firstValue = filter.value[0];
    return {
      name: firstValue.name,
      value: firstValue.value,
    };
  });
  const hasSearchInput = fetchOptions[category].search;

  return (
    <div className="flex flex-wrap items-end justify-between gap-2">
      <form className="flex flex-col gap-4 md:flex-row">
        <div>
          <span className="block text-sm text-muted-foreground">Sort</span>
          <SelectBox
            defaultValue={sortBy[0].value}
            defaultName={sortBy[0].name}
            data={sortBy}
          />
        </div>
        <div>
          <span className="block text-sm text-muted-foreground">Filter</span>
          <div className="flex gap-2">
            {filters.map(({ name, value }, index) => (
              <SelectBox
                key={name}
                defaultValue={getFilterDefaults[index].value}
                defaultName={getFilterDefaults[index].name}
                data={value}
              />
            ))}
            <Button>Apply</Button>
          </div>
        </div>
      </form>
      {hasSearchInput && <SearchInput />}
    </div>
  );
}

/*

What do I want this to do?
- Sort: When the user makes a selection it should re-render the page but not re-fetch any data, it just re-orders everything based off of what the user selected.
- Filter: When the user makes a selection and submits it should re-fetch the data and re-render the page with the new data.
- Search: When the user types in the search bar and submits it should re-fetch the data and re-render the page with the new data.
- If a re-fetch is needed, the form should take into account the current sorting option selected
- Sort and filter options need default values so that when the user goes to say /best-deals the page will load with the default sort and filter options instead of saying what the option type is

*/
