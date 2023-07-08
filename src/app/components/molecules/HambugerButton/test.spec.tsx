import { render, fireEvent } from '@testing-library/react';
import { HambugerButton } from './';

describe('HambugerButton', () => {

  it('should render HambugerButton', () => {
    const { container } = render(
      <HambugerButton>Menu items</HambugerButton>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should have hidden class when statusMenu is false', () => {
    const { getByTestId } = render(<HambugerButton>Menu Items</HambugerButton>);

    const menu = getByTestId('menu-hamburger');

    expect(menu.className).toContain('hidden');
  });

  it("shouldn't have the class hidden when statusMenu is true", () => {
    const { getByTitle, getByTestId } = render(
      <HambugerButton>Menu Items</HambugerButton>
    );

    const button = getByTitle('Menu');

    fireEvent.click(button);

    const menu = getByTestId('menu-hamburger');
    expect(menu.className).not.toContain('hidden');
  });
});
