'use client'
import { usePopulation } from '@/app/stores/population';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, LabelList } from 'recharts';
import colors from 'tailwindcss/colors';

export const Chart = () => {
  const { selectedData: { population, neighborhood, years } } = usePopulation();

  return (
    <div className="bg-gray-800 px-6 py-6">
      <h1 className="pb-8 text-3xl">{neighborhood?.name} - {years}</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data-testid="chart" width={150} height={40} data={population}>
          <Bar dataKey="populacao" fill={colors.blue[500]} />
          <XAxis dataKey="ano" data-testid="x-axis" />
          <YAxis data-testid="y-axis" />
          <Tooltip data-testid="tooltip" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

