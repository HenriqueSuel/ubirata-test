'use client';
import { usePopulation } from "../../../stores/population";

const InfoPopulation = () => {
    const { selectedData: { neighborhood, population } } = usePopulation();

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg absolute top-10 -right-1">
            <div className="px-4 py-4 bg-black">
                <p className="text-xl pb-4">{neighborhood?.name}</p>
                {population && population.map(({ ano, populacao }) => (
                    <p className="text-sm" key={ano}>Ano {ano}: {populacao}</p>
                ))}
            </div>
        </div>
    )
}

export { InfoPopulation }