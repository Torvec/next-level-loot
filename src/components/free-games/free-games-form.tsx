import { fetchOptions } from "@/lib/fetch";
import SelectBox from "@/components/ui/select-box";
import { Button } from "@/components/ui/buttons/button";

export default function FreeGamesForm() {
  const sortBy = fetchOptions["free-games"].sort;
  const filterByPlatform = fetchOptions["free-games"].filter.platform!;
  const filterByType = fetchOptions["free-games"].filter.type!;

  return (
    <form className="flex flex-col gap-4 md:flex-row">
      <div>
        <span className="block text-sm text-muted-foreground">Sort</span>
        <SelectBox selectValue={"Value"} data={sortBy} />
      </div>
      <div>
        <span className="block text-sm text-muted-foreground">Filter</span>
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
          <SelectBox selectValue={"Platform"} data={filterByPlatform} />
          <SelectBox selectValue={"Type"} data={filterByType} />
          <Button>Apply</Button>
        </div>
      </div>
    </form>
  );
}
