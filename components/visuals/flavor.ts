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
    accent: "#ff1493",
    soft: "#ffc0cb",
    deep: "#c60072",
    rgb: "255, 20, 147",
    liquid: "#ff008f",
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
