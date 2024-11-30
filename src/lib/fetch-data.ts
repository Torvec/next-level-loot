import { Category } from "@/lib/types";
import { query } from "@/lib/query";

export default async function fetchData({
  category,
  searchTerm,
  selectedSort,
  selectedOrder,
  selectedFilters,
}: {
  category: Category;
  searchTerm?: string;
  selectedSort?: string;
  selectedOrder?: string;
  selectedFilters?: Record<string, string[]>;
}) {
  const { baseURL, endPoints, queryParams, headers } = query[category];
  const { apiKey, search, sort, order, filters } = queryParams;

  const url = new URL(baseURL + endPoints.default);

  if (apiKey) {
    url.searchParams.append(apiKey.name, apiKey.value);
  }

  if (searchTerm && search) {
    url.searchParams.append(search.name, searchTerm);
  }

  if (selectedSort && sort) {
    url.searchParams.append(sort[0].name, selectedSort);
  }

  if (selectedOrder && order) {
    url.searchParams.append(order[0].name, selectedOrder);
  }

  if (selectedFilters && filters) {
    Object.entries(selectedFilters).forEach(([filterName, values]) => {
      values.forEach((value) => {
        url.searchParams.append(filterName, value);
      });
    });
  }

  // console.log(`Generated URL: ${url.toString()}`);
  const response = await fetch(url.toString(), headers ?? undefined);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data. Status: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}
