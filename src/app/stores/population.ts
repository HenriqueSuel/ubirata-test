import { create } from "zustand";
import { devtools } from "zustand/middleware";

import {
  FeatureCollection,
  PopulationNeighborhoods,
  Properties,
} from "../interfaces/neighborhoodGeometries.interface";
import { getApi } from "../service/api.service";
import { handleSelectFilter } from "../utils/populations.utils";

interface IHandleSelectProps {
  years: string;
  idNeighborhood: number;
}

export interface PopulationState {
  selectedData: {
    years: string;
    idNeighborhood: number | null;
    neighborhood: Properties | null;
    population: PopulationNeighborhoods[];
  };
  filters: {
    neighborhoods: Properties[];
    years: string[];
  };
  neighborhoodGeometries: FeatureCollection | null;
  populationNeighborhoods: PopulationNeighborhoods[];
  handleSelectData: ({
    years,
    idNeighborhood,
  }: Partial<IHandleSelectProps>) => void;
  handleGetData: () => Promise<void>;
}

const usePopulation = create<PopulationState>()(
  devtools((set, get) => ({
    selectedData: {
      years: "",
      idNeighborhood: null,
      neighborhood: null,
      population: [],
    },
    filters: {
      neighborhoods: [],
      years: [],
    },
    neighborhoodGeometries: null,
    populationNeighborhoods: [],
    handleGetData: async () => {
      const [populationNeighborhoods, neighborhoodGeometries] =
        await Promise.all([
          getApi("mocks/populacao_bairros.json") as Promise<
            PopulationNeighborhoods[]
          >,
          getApi("mocks/geometrias_bairros.json") as Promise<FeatureCollection>,
        ]);

      const filters = handleSelectFilter(
        neighborhoodGeometries,
        populationNeighborhoods
      );

      const populationInitial = populationNeighborhoods.filter(
        (population) => population.id_geometria === filters.neighborhoods[0].id
      );

      set(() => ({
        filters,
        selectedData: {
          idNeighborhood: filters.neighborhoods[0].id,
          neighborhood: filters.neighborhoods[0],
          population: populationInitial,
          years: filters.years[0],
        },
        neighborhoodGeometries,
        populationNeighborhoods,
      }));
    },
    handleSelectData: ({ idNeighborhood, years }) => {
      const existingIdNeighborhood =
        idNeighborhood || get().selectedData.idNeighborhood;

      const neighborhood = get().filters.neighborhoods.find(
        (neighborhood) => neighborhood.id === existingIdNeighborhood
      );

      const populationNeighborhoods = get().populationNeighborhoods.filter(
        (item) => item.id_geometria === existingIdNeighborhood
      );

      set((state) => ({
        selectedData: {
          neighborhood: neighborhood || null,
          population: populationNeighborhoods,
          years: years || state.selectedData.years,
          idNeighborhood: existingIdNeighborhood,
        },
      }));
    },
  }))
);

export { usePopulation };
