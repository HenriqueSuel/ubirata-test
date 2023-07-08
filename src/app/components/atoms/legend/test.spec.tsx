import { render, screen } from '@testing-library/react';
import { LEGENDS } from '../../../utils/legends.utils';
import { Legend } from './';

describe('Legend', () => {
  it('should renders Legend', () => {
    const { container } = render(<Legend />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should renders legend items correctly', () => {
    render(<Legend />);

    LEGENDS.forEach(({ value, text }) => {
      const legendItem = screen.getByText(text);
      expect(legendItem).toBeInTheDocument();
    });
  });
});
