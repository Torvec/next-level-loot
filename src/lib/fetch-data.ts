import { type Category } from "@/lib/types";
import { query } from "@/lib/query";

export default async function fetchData({
  category,
  searchTerm,
  selectedSort,
  selectedOrder,
  selectedFilters,
  id,
}: {
  category: Category;
  searchTerm?: string;
  selectedSort?: string;
  selectedOrder?: string;
  selectedFilters?: Record<string, string[]>;
  id?: string;
}) {
  const { baseURL, endPoints, queryParams, headers } = query[category];
  const { apiKey, search, sort, order, filters } = queryParams;

  let url;
  if (id) url = new URL(baseURL + endPoints.details + id);
  else url = new URL(baseURL + endPoints.default);

  if (apiKey) url.searchParams.append(apiKey.name, apiKey.value);

  if (searchTerm && search) url.searchParams.append(search.name, searchTerm);

  if (selectedSort && sort) url.searchParams.append(sort.name, selectedSort);

  if (selectedOrder && order)
    url.searchParams.append(order.name, selectedOrder);

  if (selectedFilters && filters) {
    Object.entries(selectedFilters).forEach(([filterName, options]) => {
      options.forEach((option) => {
        url.searchParams.append(filterName, option);
      });
    });
  }

  const response = await fetch(url, headers ?? undefined);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data. Status: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}
