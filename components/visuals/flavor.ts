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
    label: "Chicle Rosa",
    note: "Tutti-Frutti",
    accent: "#ff8fbc",
    soft: "#ffc0cb",
    deep: "#d65793",
    rgb: "255, 143, 188",
    liquid: "#ff9cc6",
  },
  purple: {
    id: "purple",
    label: "Uva Lila",
    note: "Uva",
    accent: "#b99cff",
    soft: "#e8d7ff",
    deep: "#8b65dc",
    rgb: "185, 156, 255",
    liquid: "#c3a5ff",
  },
};
