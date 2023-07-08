import { LEGENDS, findColorByPopulation } from '../legends.utils'; // Substitua 'your-file' pelo caminho correto do arquivo

describe('findColorByPopulation', () => {
  const populations = [
    { id_geometria: 1, populacao: 10000, ano: '2021' },
    { id_geometria: 2, populacao: 15000, ano: '2021' },
    { id_geometria: 1, populacao: 8000, ano: '2022' },
    { id_geometria: 2, populacao: 18000, ano: '2022' },
  ];

  it('should return default color when population is not found', () => {
    const id = 3;
    const years = '2021';

    const color = findColorByPopulation(id, populations, years);

    expect(color).toEqual(LEGENDS[LEGENDS.length - 1].rgb);
  });

  it('should return correct color based on population value', () => {
    const id = 1;
    const years = '2021';

    const color = findColorByPopulation(id, populations, years);

    const expectedColor = LEGENDS.find(legend => populations[0].populacao > legend.value)?.rgb;
    expect(color).toEqual(expectedColor);
  });

  it('should return default color when population value is not found in legends', () => {
    const id = 2;
    const years = '2022';

    const color = findColorByPopulation(id, populations, years);
    expect(color).toEqual(LEGENDS[1].rgb);
  });
});