// __mocks__/vitest-env.d.ts
/// <reference types="vite/client" />
/// <reference types="vitest/globals" />

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: ['./tests/setup.js'],
    environment: "jsdom",
    globals: true,
    include: ["./**/*.spec.tsx", "./**/*.spec.ts"],
  },
});
