import { render, screen } from '@testing-library/react';
import { usePopulation } from '@/app/stores/population';
import { Chart } from './';
import { Mock } from 'vitest';

vi.mock('@/app/stores/population', () => ({
    usePopulation: vi.fn(),
}));

vi.mock("recharts", async () => {
    const OriginalModule = await import("recharts");
    return {
        ...OriginalModule,
        ResponsiveContainer: ({ children }: { children: React.ReactElement }) => (
            <OriginalModule.ResponsiveContainer width={800} height={800}>
                {children}
            </OriginalModule.ResponsiveContainer>
        ),
    };
});


const mockPopulation = [
    { ano: '2021', populacao: 10030 },
    { ano: '2022', populacao: 8000 },
];
const mockNeighborhood = { id: 1, name: 'Neighborhood 1' };
const mockYears = '2021 - 2022';

describe('Chart', () => {
    beforeEach(() => {
        (usePopulation as unknown as Mock).mockReturnValue({
            selectedData: { population: mockPopulation, neighborhood: mockNeighborhood, years: mockYears },
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should render neighborhood name and years correctly', () => {
        const { container } = render(<Chart />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render BarChart with population data', () => {
        render(<Chart />);

        mockPopulation.forEach(({ populacao }) => {
            const bar = screen.getByText(populacao.toString());
            expect(bar).toBeInTheDocument();
        });
    });
});
