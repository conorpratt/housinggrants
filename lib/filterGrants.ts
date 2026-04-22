import type { Grant, FilterState, GrantCategory } from "./types";

export function filterGrants(grants: Grant[], filters: FilterState): Grant[] {
  return grants.filter((grant) => {
    if (!grant.isActive) return false;

    if (filters.buyerType) {
      const hasBuyerType =
        !grant.eligibleBuyerType ||
        grant.eligibleBuyerType.length === 0 ||
        grant.eligibleBuyerType.includes(filters.buyerType as never);
      if (!hasBuyerType) return false;
    }

    if (filters.intents && filters.intents.length > 0) {
      const hasMatchingCategory = filters.intents.some((intent) =>
        grant.category.includes(intent as GrantCategory)
      );
      if (!hasMatchingCategory) return false;
    }

    if (filters.propertyType) {
      const hasPropertyType =
        !grant.eligiblePropertyType ||
        grant.eligiblePropertyType.length === 0 ||
        grant.eligiblePropertyType.includes(filters.propertyType as never);
      if (!hasPropertyType) return false;
    }

    return true;
  });
}

export function parseFiltersFromParams(params: {
  buyerType?: string;
  intents?: string;
  propertyType?: string;
}): FilterState {
  return {
    buyerType: (params.buyerType as FilterState["buyerType"]) || "",
    intents: params.intents
      ? (params.intents.split(",") as FilterState["intents"])
      : [],
    propertyType: (params.propertyType as FilterState["propertyType"]) || "",
  };
}

export function buildResultsUrl(filters: FilterState): string {
  const params = new URLSearchParams();
  if (filters.buyerType) params.set("buyerType", filters.buyerType);
  if (filters.intents.length > 0)
    params.set("intents", filters.intents.join(","));
  if (filters.propertyType) params.set("propertyType", filters.propertyType);
  return `/results?${params.toString()}`;
}
