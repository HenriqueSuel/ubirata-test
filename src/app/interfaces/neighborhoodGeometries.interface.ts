interface Coordinate {
  type: string;
  coordinates: number[][][];
}

interface Geometry {
  type: string;
  coordinates: Coordinate[];
}

interface Properties {
  id: number;
  name: string;
  setor: string;
  zona: string;
}

interface Feature {
  type: string;
  properties: Properties;
  geometry: Geometry;
  bbox: number[];
}

interface FeatureCollection {
  type: string;
  name: string;
  crs: {
    type: string;
    properties: {
      name: string;
    };
  };
  features: Feature[];
}

interface PopulationNeighborhoods {
  id_geometria: number;
  ano: string;
  populacao: number;
}

export type { FeatureCollection, Properties, PopulationNeighborhoods, Feature };
