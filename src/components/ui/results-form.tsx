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
import { type QueryParamType } from "@/lib/query";

export default async function ResultsForm({
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
    <div className="flex flex-col justify-between gap-2 md:flex-row">
      <Filters filters={filters} params={params} category={category} />
      <div className="flex flex-col gap-2 md:flex-row">
        <Sort sort={sort} params={params} />
        <Order order={order} params={params} />
      </div>
    </div>
  );
}

const Filters = ({
  filters,
  params,
  category,
}: {
  filters: QueryParamType["filters"];
  params: URLSearchParams;
  category: Category;
}) => {
  if (filters) {
    return (
      <div>
        <div className="flex flex-col gap-2 md:flex-row">
          {filters.map((filter) => (
            <Popover key={filter.name}>
              <PopoverTrigger asChild>
                <Button className="w-full min-w-32 bg-muted-foreground md:w-max">
                  {`${filter.type}: ${
                    getCurrentValue(params, filter.name, filter.options) ||
                    "All"
                  }`}
                  <ChevronUp />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="max-h-96 w-[calc(100vw-32px)] overflow-y-auto md:w-max"
              >
                <ul>
                  <li>
                    <Link
                      href={getUpdatedQuery(params, filter.name, "")}
                      className={`block px-2 py-1 hover:bg-muted ${
                        !params.get(filter.name) ? "bg-muted" : ""
                      }`}
                    >
                      All
                    </Link>
                  </li>
                  {filter.options.map((option) => (
                    <li key={option.value}>
                      <Link
                        href={getUpdatedQuery(
                          params,
                          filter.name,
                          option.value,
                        )}
                        className={`block px-2 py-1 hover:bg-muted ${
                          isSelected(params, filter.name, option.value)
                            ? "bg-muted"
                            : ""
                        }`}
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
        {hasParams(params) && <Link href={`/${category}`}>Reset Filters</Link>}
      </div>
    );
  }
};

const Sort = ({
  sort,
  params,
}: {
  sort: QueryParamType["sort"];
  params: URLSearchParams;
}) => {
  if (sort) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button className="w-full min-w-32 bg-muted-foreground">
            Sort:{" "}
            {getCurrentValue(params, sort.name, sort.options) || sort.default}
            <ChevronUp />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="max-h-96 w-[calc(100vw-32px)] overflow-y-auto md:w-max"
        >
          <ul>
            <li>
              <Link
                href={getUpdatedQuery(params, sort.name, "")}
                className={`block px-2 py-1 hover:bg-muted ${
                  !params.get(sort.name) ? "bg-muted" : ""
                }`}
              >
                Default
              </Link>
            </li>
            {sort.options.map((option) => (
              <li key={option.value}>
                <Link
                  href={getUpdatedQuery(params, sort.name, option.value)}
                  className={`block px-2 py-1 hover:bg-muted ${
                    isSelected(params, sort.name, option.value)
                      ? "bg-muted"
                      : ""
                  }`}
                >
                  {option.name}
                </Link>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    );
  }
};

const Order = ({
  order,
  params,
}: {
  order: QueryParamType["order"];
  params: URLSearchParams;
}) => {
  if (order) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button className="w-full min-w-32 bg-muted-foreground">
            Order:{" "}
            {getCurrentValue(params, order.name, order.options) ||
              order.default}
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
                  href={getUpdatedQuery(params, order.name, option.value)}
                  className={`block px-2 py-1 hover:bg-muted ${
                    isSelected(params, order.name, option.value)
                      ? "bg-muted"
                      : ""
                  }`}
                >
                  {option.name}
                </Link>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    );
  }
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
