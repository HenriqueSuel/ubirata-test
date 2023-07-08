import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import { SelectInput } from './';

describe('SelectInput', () => {
  const options = [
    { title: 'Option 1', value: '1' },
    { title: 'Option 2', value: '2' },
    { title: 'Option 3', value: '3' },
  ];

  it('should render label and options correctly', () => {
    const label = 'Select an option';
    render(
      <SelectInput
        label={label}
        options={options}
        onSelected={() => { }}
      />
    );

    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();

    options.forEach((option) => {
      const optionElement = screen.getByText(option.title);
      expect(optionElement).toBeInTheDocument();
    });
  });

  it('should call the selected callback when an option is selectedd', () => {
    const label = 'Select an option';
    const onSelectedMock = vi.fn();
    render(
      <SelectInput
        label={label}
        options={options}
        onSelected={onSelectedMock}
      />
    );

    const selectElement = screen.getByLabelText(label);

    fireEvent.change(selectElement, { target: { value: options[1].value } });

    expect(onSelectedMock).toHaveBeenCalledTimes(1);
    expect(onSelectedMock).toHaveBeenCalledWith(options[1].value);
  });
});
