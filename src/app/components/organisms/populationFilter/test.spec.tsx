import { render, screen, fireEvent } from '@testing-library/react';
import { usePopulation } from '@/app/stores/population';
import { PopulationFilter } from './';
import { Mock } from 'vitest';

vi.mock('@/app/stores/population', () => ({
    usePopulation: vi.fn(),
}));

describe('PopulationFilter', () => {
    const mockNeighborhoods = [
        { id: 1, name: 'Neighborhood 1' },
        { id: 2, name: 'Neighborhood 2' },
    ];
    const mockYears = ['2021', '2022'];

    beforeEach(() => {
        (usePopulation as unknown as Mock).mockReturnValue({
            filters: { neighborhoods: mockNeighborhoods, years: mockYears },
            handleGetData: vi.fn(),
            handleSelectData: vi.fn(),
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should render select inputs correctly', () => {
        render(<PopulationFilter />);
        const yearSelectInput = screen.getByLabelText('Ano');
        const neighborhoodSelectInput = screen.getByLabelText('Bairro');

        expect(yearSelectInput).toBeInTheDocument();
        expect(neighborhoodSelectInput).toBeInTheDocument();
    });

    it('should call handleSelectData with selected year value', () => {
        render(<PopulationFilter />);
        const yearSelectInput = screen.getByLabelText('Ano');

        fireEvent.change(yearSelectInput, { target: { value: '2022' } });

        expect(usePopulation().handleSelectData).toHaveBeenCalledWith({ years: '2022' });
    });

    it('should call handleSelectData with selected neighborhood value', () => {
        render(<PopulationFilter />);
        const neighborhoodSelectInput = screen.getByLabelText('Bairro');

        fireEvent.change(neighborhoodSelectInput, { target: { value: '2' } });

        expect(usePopulation().handleSelectData).toHaveBeenCalledWith({ idNeighborhood: 2 });
    });
});
