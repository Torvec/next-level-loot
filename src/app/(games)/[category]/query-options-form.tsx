//! This is temporary
/* eslint-disable @typescript-eslint/no-explicit-any */
//! This is temporary
import Link from "next/link";
import { query } from "@/lib/query";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ChevronUp } from "lucide-react";
import { type Category } from "@/lib/types";

export default async function QueryOptionsForm({
  category,
  searchParams,
}: {
  category: Category;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { sort, order, filters } = query[category].queryParams;

  const paramsObject = await searchParams;
  const params = new URLSearchParams(
    Object.entries(paramsObject).flatMap(([key, value]) =>
      Array.isArray(value)
        ? value.map((v) => [key, v])
        : value !== undefined
          ? [[key, value]]
          : [],
    ),
  );

  return (
    <>
      <div className="mb-2 flex flex-col justify-between gap-2 md:flex-row">
        <div className="flex flex-col gap-2 md:flex-row">
          {filters?.map((filter) => (
            <QueryOption
              key={filter.name}
              params={params}
              filter={filter}
              align="start"
            />
          ))}
          <QueryOption params={params} filter={sort} align="start" />
          {order && (
            <QueryOption params={params} filter={order} align="start" />
          )}
        </div>
      </div>
      <FilterResetButton category={category} params={params} />
    </>
  );
}

const QueryOption = ({
  params,
  filter,
  align,
}: {
  params: URLSearchParams;
  filter: any;
  align: "start" | "end";
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <QueryOptionButton
          params={params}
          filter={filter}
          typeText={filter.type}
        />
      </PopoverTrigger>
      <PopoverContent
        align={align}
        className="max-h-96 w-[calc(100vw-32px)] overflow-y-auto md:w-max"
      >
        <QueryOptionList params={params} filter={filter} />
      </PopoverContent>
    </Popover>
  );
};

const QueryOptionButton = ({
  params,
  filter,
  typeText,
}: {
  params: URLSearchParams;
  filter: any;
  typeText: string;
}) => {
  const currentOption =
    getCurrentValue(params, filter.name, filter.options) || filter.default;

  return (
    <Button className="w-full min-w-max bg-muted-foreground">
      {typeText}: {currentOption}
      <ChevronUp />
    </Button>
  );
};

const QueryOptionList = ({
  params,
  filter,
}: {
  params: URLSearchParams;
  filter: any;
}) => {
  return (
    <ul>
      {filter.options.map((option: any) => (
        <li key={option.value}>
          <Link
            href={getUpdatedQuery(params, filter.name, option.value)}
            className={`block px-2 py-1 hover:bg-muted ${
              isSelected(params, filter.name, option.value) ? "bg-muted" : ""
            }`}
          >
            {option.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const FilterResetButton = ({
  category,
  params,
}: {
  category: Category;
  params: URLSearchParams;
}) => {
  return hasParams(params) ? (
    <Link href={`/${category}`}>Reset Filters</Link>
  ) : (
    <span className="opacity-50">Select Filters</span>
  );
};

const getCurrentValue = (
  params: URLSearchParams,
  key: string,
  options: { name: string; value: string }[],
) => {
  const selectedValue = params.get(key) || "";
  return options.find((option) => option.value === selectedValue)?.name;
};

const getUpdatedQuery = (
  params: URLSearchParams,
  key: string,
  value: string,
) => {
  const updatedParams = new URLSearchParams(params.toString());
  if (value) updatedParams.set(key, value);
  else updatedParams.delete(key);
  return `?${updatedParams.toString()}`;
};

const isSelected = (params: URLSearchParams, key: string, value: string) => {
  return params.get(key) === value;
};

const hasParams = (params: URLSearchParams) => {
  return Array.from(params.entries()).length > 0;
};
