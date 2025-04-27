import Link from "next/link";
import { query } from "@/lib/query";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { ChevronUp } from "lucide-react";
import {
  type QueryOptionsFormProps,
  type QueryOptionButtonProps,
  type QueryOptionProps,
  type QueryOptionListProps,
  type GetCurrentValueProps,
  type GetUpdatedQueryProps,
  type IsSelectedProps,
} from "@/types/types";

// Main Component

export default function QueryOptionsForm({ category, searchParams }: QueryOptionsFormProps) {
  const { sort, order, filters } = query[category].queryParams;

  const params = new URLSearchParams(
    Object.entries(searchParams).filter(([, value]) => value !== undefined) as [string, string][],
  );

  // Dynamically combine all query options
  const queryOptions = [
    ...(filters || []), // map over filters if they exist
    ...(sort ? [sort] : []), // add sort if it exists
    ...(order ? [order] : []), // add order if it exists
  ];

  const showReset = hasParams(params);

  return (
    <>
      <div className="mb-2 flex flex-col justify-between gap-2 md:flex-row">
        <div className="flex flex-col gap-2 md:flex-row">
          {queryOptions.map((option) => (
            <QueryOption key={option.name} params={params} filter={option} />
          ))}
        </div>
      </div>
      {showReset ? (
        <Link href={`/${category}`}>Reset Filters</Link>
      ) : (
        <span className="opacity-50">Select Filters</span>
      )}
    </>
  );
}

// Sub-Components

const QueryOption = ({ params, filter }: QueryOptionProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <QueryOptionButton params={params} filter={filter} typeText={filter.type || ""} />
      </PopoverTrigger>
      <PopoverContent className="max-h-96 w-[calc(100vw-32px)] overflow-y-auto md:w-max">
        <QueryOptionList params={params} filter={filter} />
      </PopoverContent>
    </Popover>
  );
};

const QueryOptionButton = ({ params, filter, typeText }: QueryOptionButtonProps) => {
  const currentOption =
    getCurrentValue({ params, key: filter.name, options: filter.options }) || filter.default || "";

  return (
    <Button className="w-full min-w-max bg-muted-foreground">
      {typeText}: {currentOption || ""}
      <ChevronUp />
    </Button>
  );
};

const QueryOptionList = ({ params, filter }: QueryOptionListProps) => {
  return (
    <ul>
      {filter.options.map((option) => {
        const selectedValue = isSelected({
          params,
          key: filter.name,
          value: option.value,
        })
          ? "bg-muted"
          : "";
        return (
          <li key={option.value}>
            <Link
              href={getUpdatedQuery({
                params,
                key: filter.name,
                value: option.value,
              })}
              className={`block px-2 py-1 hover:bg-muted ${selectedValue}`}
            >
              {option.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

// Utility Functions

const getCurrentValue = ({ params, key, options }: GetCurrentValueProps) => {
  const selectedValue = params.get(key) || "";
  return options.find((option) => option.value === selectedValue)?.name;
};

const getUpdatedQuery = ({ params, key, value }: GetUpdatedQueryProps) => {
  const updatedParams = new URLSearchParams(params.toString());
  if (value) updatedParams.set(key, value);
  else updatedParams.delete(key);
  return `?${updatedParams.toString()}`;
};

const isSelected = ({ params, key, value }: IsSelectedProps) => {
  return params.get(key) === value;
};

const hasParams = (params: URLSearchParams) => {
  return Array.from(params.entries()).length > 0;
};
