export type BuyerType =
  | "first-time-buyer"
  | "second-time-buyer"
  | "existing-homeowner";

export type PropertyType = "new-build" | "second-hand" | "vacant" | "derelict";

export type GrantCategory =
  | "buy"
  | "renovate"
  | "retrofit"
  | "insulation"
  | "solar"
  | "heat-pump"
  | "windows-doors"
  | "vacant";

export interface Grant {
  id: string;
  name: string;
  provider: string;
  category: GrantCategory[];
  eligibleBuyerType: BuyerType[];
  eligiblePropertyType: PropertyType[];
  maxValue: number;
  valueSummary: string;
  description: string;
  keyRequirements: string[];
  applicationUrl: string;
  moreInfoUrl: string;
  isActive: boolean;
  lastVerified: string;
  tags: string[];
}

export interface FilterState {
  buyerType: BuyerType | "";
  intents: GrantCategory[];
  propertyType: PropertyType | "";
}

export interface Category {
  id: string;
  label: string;
  icon: string;
}
