import { PopulationNeighborhoods } from "../interfaces/neighborhoodGeometries.interface";

import colors from "tailwindcss/colors";

const LEGENDS = [
  {
    value: 20000,
    text: "20000 - 25000",
    color: "before:bg-blue-950",
    rgb: colors.blue[950],
  },
  {
    value: 17000,
    text: "17000 - 19999",
    color: "before:bg-blue-800",
    rgb: colors.blue[800],
  },
  {
    value: 13000,
    text: "13000 - 16999",
    color: "before:bg-blue-500",
    rgb: colors.blue[500],
  },
  {
    value: 9000,
    text: "9000 - 12999",
    color: "before:bg-blue-300",
    rgb: colors.blue[300],
  },
  {
    value: 5000,
    text: "5000 - 8999",
    color: "before:bg-blue-100",
    rgb: colors.blue[100],
  },
];

const findColorByPopulation = (
  id: number,
  populations: PopulationNeighborhoods[],
  years: string
) => {
  const valueDefault = LEGENDS[LEGENDS.length - 1].rgb;
  
  const population = populations.find(
    (population) => population.id_geometria === id && years === population.ano
  );

  if (!population) return valueDefault;

  return LEGENDS.find((legend) => population?.populacao > legend.value)?.rgb;
};

export { LEGENDS, findColorByPopulation };
