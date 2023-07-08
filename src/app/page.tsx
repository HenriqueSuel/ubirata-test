"use client"
import dynamic from "next/dynamic";
import { InfoPopulation } from './components/organisms/infoPopulation';
import { Legend } from './components/atoms/legend';
import { Chart } from "./components/molecules/chart";

export default function Home() {

  const ChoroplethMap = dynamic(() => import('./components/organisms/choroplethMap').then((mod) => mod.ChoroplethMap), {
    ssr: false
  });

  return (
    <main className="p-24">
      <div className="flex min-h-screen flex-col  items-center justify-between relative">
        <ChoroplethMap />
        <InfoPopulation />
        <Legend />
      </div>
      <Chart />
    </main>
  )
}
