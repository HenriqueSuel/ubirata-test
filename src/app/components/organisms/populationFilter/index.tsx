'use client';
import { usePopulation } from "@/app/stores/population"
import { useEffect } from "react";
import { SelectInput } from "../../molecules/selectInput"

const PopulationFilter = () => {
    const { handleGetData, filters: { neighborhoods, years }, handleSelectData } = usePopulation();

    useEffect(() => {
        handleGetData();
    }, [handleGetData])

    return (
        <>
            <SelectInput onSelected={(value) => handleSelectData({ years: String(value) })} label='Ano' options={years.map(year => ({ title: year, value: year }))} />
            <SelectInput onSelected={(value) => handleSelectData({ idNeighborhood: Number(value) })} label='Bairro' options={neighborhoods.map(neighborhood => ({ title: neighborhood.name, value: neighborhood.id }))} />
        </>
    )
}


export { PopulationFilter }