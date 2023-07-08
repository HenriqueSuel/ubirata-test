import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { Layer, LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { findColorByPopulation } from "../../../utils/legends.utils";
import { StyleFunction } from "leaflet";
import { usePopulation } from "@/app/stores/population";
import { Feature } from "@/app/interfaces/neighborhoodGeometries.interface";


type TMapContainer = typeof MapContainer
interface IMapRef extends TMapContainer {
  _targets: {
    [key: string]: any;
  }
}

const mapStyle = {
  height: '90vh',
  width: '100%',
  margin: '0 auto',
}

const ChoroplethMap = () => {
  const mapRef = useRef(null);
  const { neighborhoodGeometries, populationNeighborhoods, selectedData: { years, idNeighborhood }, handleSelectData } = usePopulation();

  const style: StyleFunction<Feature> = ((feature) => {
    return {
      fillColor: findColorByPopulation((feature as unknown as Feature)?.properties?.id, populationNeighborhoods, years || ''),
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '2',
      fillOpacity: 0.5,
    };
  });

  const handleClickNeighborhood = (event: LeafletMouseEvent) => {
    const idNeighborhood = event.target.feature.properties.id;
    handleSelectData({ idNeighborhood })
  }

  const onEachFeature = (feature: Feature, layer: Layer) => {
    const { name } = feature.properties;
    layer.on({
      click: handleClickNeighborhood,
    });
    layer.bindPopup(name);
  };

  useEffect(() => {
    if (!idNeighborhood || !mapRef?.current) return;

    const current = mapRef as unknown as IMapRef;
    const keysTargets = Object.keys(current._targets);

    const key = keysTargets.find(key => {
      const featureId = current?._targets[key]?.feature?.properties?.id;
      return featureId === idNeighborhood;
    });

    if (key && current?._targets[key]) {
      current._targets[key].fireEvent('click');
    }
  }, [idNeighborhood]);

  return (
    <>
      {neighborhoodGeometries && (
        <MapContainer ref={mapRef} center={[-23.219348899996696, -45.917073951577279]} zoom={13} scrollWheelZoom={false} style={mapStyle}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON data={neighborhoodGeometries as any} style={style} onEachFeature={onEachFeature as any} />
        </MapContainer>

      )}
    </>
  )
}

export { ChoroplethMap }
