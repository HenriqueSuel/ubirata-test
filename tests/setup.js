import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import matchers from '@testing-library/jest-dom/matchers';

import ResizeObserver from 'resize-observer-polyfill';

window.ResizeObserver = ResizeObserver;


// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
