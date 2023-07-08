import { render, screen } from '@testing-library/react';
import { Mock } from 'vitest';
import { usePopulation } from '../../../stores/population';
import { InfoPopulation } from './';

vi.mock('../../../stores/population', () => ({
    usePopulation: vi.fn(),
}));

const mockNeighborhood = { id: 1, name: 'Neighborhood 1' };
const mockPopulation = [
    { ano: '2021', populacao: 10000 },
    { ano: '2022', populacao: 8000 },
];

describe('InfoPopulation', () => {

    beforeEach(() => {
        (usePopulation as unknown as Mock).mockReturnValue({
            selectedData: { neighborhood: mockNeighborhood, population: mockPopulation },
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should render InfoPopulation', () => {
        const { container } = render(<InfoPopulation />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render neighborhood name correctly', () => {
        render(<InfoPopulation />);
        const neighborhoodName = screen.getByText(mockNeighborhood.name);
        expect(neighborhoodName).toBeInTheDocument();
    });

    it('should render population data correctly', () => {
        render(<InfoPopulation />);
        mockPopulation.forEach(({ ano, populacao }) => {
            const populationData = screen.getByText(`Ano ${ano}: ${populacao}`);
            expect(populationData).toBeInTheDocument();
        });
    });
});
