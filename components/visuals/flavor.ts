export type FlavorId = "pink" | "purple";

export type FlavorDefinition = {
  id: FlavorId;
  label: string;
  note: string;
  accent: string;
  soft: string;
  deep: string;
  rgb: string;
  liquid: string;
};

export const flavors: Record<FlavorId, FlavorDefinition> = {
  pink: {
    id: "pink",
    label: "Pink Candy",
    note: "Tutti-Frutti",
    accent: "#ff4faf",
    soft: "#ffc4df",
    deep: "#8a105a",
    rgb: "255, 79, 175",
    liquid: "#ff62b7",
  },
  purple: {
    id: "purple",
    label: "Purple Candy",
    note: "Uva",
    accent: "#a45cff",
    soft: "#dfc4ff",
    deep: "#3912a6",
    rgb: "164, 92, 255",
    liquid: "#8d3dff",
  },
};
