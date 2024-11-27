import { fetchOptions } from "@/lib/fetch";
import SearchInput from "@/components/ui/search-input";
import SelectBox from "@/components/ui/select-box";
import { Button } from "@/components/ui/buttons/button";

export default function BestDealsForm() {
  const sortBy = fetchOptions["best-deals"].sort;
  const filterByStore = fetchOptions["best-deals"].filter.store!;

  return (
    <div className="space-y-4">
      <SearchInput />
      <form className="flex flex-col gap-4 md:flex-row">
        <div>
          <span className="block text-sm text-muted-foreground">Sort</span>
          <SelectBox selectValue={"Deal Rating"} data={sortBy} />
        </div>
        <div>
          <span className="block text-sm text-muted-foreground">Filter</span>
          <div className="grid gap-2 md:grid-cols-2">
            <SelectBox selectValue={"Store"} data={filterByStore} />
            <Button>Apply</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
