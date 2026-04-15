/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readdirSync } from "node:fs";
// import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

const packagesDir = path.resolve(dirname, "../../packages");
const packageAliases = Object.fromEntries(
  readdirSync(packagesDir).map((pkg) => [
    `@bearlab/${pkg}`,
    path.resolve(packagesDir, pkg, "src/index.ts"),
  ])
);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: packageAliases,
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // storybookTest({ configDir: path.join(dirname, ".storybook") }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
