import {
  FeatureCollection,
  PopulationNeighborhoods,
} from "../interfaces/neighborhoodGeometries.interface";

export const handleSelectFilter = (
  neighborhoodGeometries: FeatureCollection,
  populationNeighborhoods: PopulationNeighborhoods[]
) => {
  const neighborhoods = filterNeighborhoods(neighborhoodGeometries);
  const years = filterUniqueYears(populationNeighborhoods);

  return { neighborhoods, years };
};

export const filterNeighborhoods = (neighborhoodGeometries: FeatureCollection) => {
  const neighborhoods = neighborhoodGeometries.features.map(
    (feature) => feature.properties
  );
  return neighborhoods;
};

export const filterUniqueYears = (
  populationNeighborhoods: PopulationNeighborhoods[]
) => {
  const uniqueYears = new Set(
    populationNeighborhoods.map((population) => population.ano)
  );
  const years = Array.from(uniqueYears);

  return years;
};
