import {
  handleSelectFilter,
  filterNeighborhoods,
  filterUniqueYears,
} from "../populations.utils";

describe("handleSelectFilter", () => {
  const neighborhoodGeometries = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "Neighborhood 1" },
      },
      {
        type: "Feature",
        properties: { name: "Neighborhood 2" },
      },
    ],
  };

  const populationNeighborhoods = [
    { id_geometria: 1, populacao: 10000, ano: "2021" },
    { id_geometria: 2, populacao: 15000, ano: "2021" },
    { id_geometria: 1, populacao: 8000, ano: "2022" },
    { id_geometria: 2, populacao: 18000, ano: "2022" },
  ];

  it("should return the filtered neighborhoods and unique years", () => {
    const result = handleSelectFilter(
      neighborhoodGeometries,
      populationNeighborhoods
    );

    expect(result).toEqual({
      neighborhoods: [{ name: "Neighborhood 1" }, { name: "Neighborhood 2" }],
      years: ["2021", "2022"],
    });
  });
});

describe("filterNeighborhoods", () => {
  const neighborhoodGeometries = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "Neighborhood 1" },
      },
      {
        type: "Feature",
        properties: { name: "Neighborhood 2" },
      },
    ],
  };

  it("should return the filtered neighborhoods", () => {
    const result = filterNeighborhoods(neighborhoodGeometries);

    expect(result).toEqual([
      { name: "Neighborhood 1" },
      { name: "Neighborhood 2" },
    ]);
  });
});

describe("filterUniqueYears", () => {
  const populationNeighborhoods = [
    { id_geometria: 1, populacao: 10000, ano: "2021" },
    { id_geometria: 2, populacao: 15000, ano: "2021" },
    { id_geometria: 1, populacao: 8000, ano: "2022" },
    { id_geometria: 2, populacao: 18000, ano: "2022" },
  ];

  it("should return the unique years", () => {
    const result = filterUniqueYears(populationNeighborhoods);

    expect(result).toEqual(["2021", "2022"]);
  });
});
