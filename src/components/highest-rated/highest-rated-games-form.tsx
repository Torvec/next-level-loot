import { fetchOptions } from "@/lib/fetch";
import SearchInput from "@/components/ui/search-input";
import SelectBox from "@/components/ui/select-box";
import { Button } from "@/components/ui/buttons/button";

export default function HighestRatedGamesForm() {
  const sortBy = fetchOptions["highest-rated"].sort;
  const filterByPlatform = fetchOptions["highest-rated"].filter.platform!;
  const filterByStore = fetchOptions["highest-rated"].filter.store!;
  const filterByGenre = fetchOptions["highest-rated"].filter.genre!;

  return (
    <div className="space-y-4">
      <SearchInput />
      <form className="flex flex-col gap-4 lg:flex-row">
        <div>
          <span className="block text-sm text-muted-foreground">Sort</span>
          <SelectBox selectValue={"Metacritic"} data={sortBy} />
        </div>
        <div>
          <span className="block text-sm text-muted-foreground">Filter</span>
          <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-4">
            <SelectBox selectValue={"Platform"} data={filterByPlatform} />
            <SelectBox selectValue={"Store"} data={filterByStore} />
            <SelectBox selectValue={"Genre"} data={filterByGenre} />
            <Button>Apply</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
