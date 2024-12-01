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
  const { apiKey, search, sort, order, filters, details } = queryParams;

  let url;
  if (id) {
    if (category === "free-games") {
      // Because the endpoint is giveaway and not giveaways
      url = new URL(baseURL + endPoints.details);
    } else if (category === "highest-rated") {
      // Because the endpoint is games but with a / at the end and that gets encoded weirdly to %2F
      url = new URL(baseURL + endPoints.default + "/" + id);
    } else {
      url = new URL(baseURL + endPoints.default);
    }
  } else {
    url = new URL(baseURL + endPoints.default);
  }

  if (details && id)
    url.searchParams.append(details.name, decodeURIComponent(id));

  if (apiKey) url.searchParams.append(apiKey.name, apiKey.value);

  if (searchTerm && search) url.searchParams.append(search.name, searchTerm);

  if (selectedSort && sort) url.searchParams.append(sort.name, selectedSort);

  if (selectedOrder && order)
    url.searchParams.append(order.name, selectedOrder);

  if (selectedFilters && filters) {
    Object.entries(selectedFilters).forEach(([filterName, values]) => {
      values.forEach((value) => {
        url.searchParams.append(filterName, value);
      });
    });
  }

  const response = await fetch(url.toString(), headers ?? undefined);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data. Status: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}
