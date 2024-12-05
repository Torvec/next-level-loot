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

  const getCurrentValue = (
    key: string,
    options: { name: string; value: string }[],
  ) => {
    const selectedValue = params.get(key) || "";
    return options.find((option) => option.value === selectedValue)?.name;
  };

  const getUpdatedQuery = (key: string, value: string) => {
    const updatedParams = new URLSearchParams(params.toString());
    if (value) updatedParams.set(key, value);
    else updatedParams.delete(key);
    return `?${updatedParams.toString()}`;
  };

  return (
    <div className="flex flex-col justify-between gap-2 md:flex-row">
      {filters && (
        <div>
          <div className="flex flex-col gap-2 md:flex-row">
            {filters.map((filter) => (
              <Popover key={filter.name}>
                <PopoverTrigger asChild>
                  <Button className="w-full min-w-32 bg-muted-foreground md:w-max">
                    {`${filter.type}: ${
                      getCurrentValue(filter.name, filter.options) || "All"
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
                        href={getUpdatedQuery(filter.name, "")} // Remove the filter
                        className="block px-2 py-1 hover:bg-muted"
                      >
                        All
                      </Link>
                    </li>
                    {filter.options.map((option) => (
                      <li key={option.value}>
                        <Link
                          href={getUpdatedQuery(filter.name, option.value)}
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
          <Popover>
            <PopoverTrigger asChild>
              <Button className="w-full min-w-32 bg-muted-foreground">
                Sort: {getCurrentValue(sort.name, sort.options) || sort.default}
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
                    href={getUpdatedQuery(sort.name, "")} // Remove the filter
                    className="block px-2 py-1 hover:bg-muted"
                  >
                    Default
                  </Link>
                </li>
                {sort.options.map((option) => (
                  <li key={option.value}>
                    <Link
                      href={getUpdatedQuery(sort.name, option.value)}
                      className="block px-2 py-1 hover:bg-muted"
                    >
                      {option.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
        )}
        {order && (
          <Popover>
            <PopoverTrigger asChild>
              <Button className="w-full min-w-32 bg-muted-foreground">
                Order:{" "}
                {getCurrentValue(order.name, order.options) || order.default}
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
                      href={getUpdatedQuery(order.name, option.value)}
                      className="block px-2 py-1 hover:bg-muted"
                    >
                      {option.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}
