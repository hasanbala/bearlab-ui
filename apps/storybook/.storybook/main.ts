import type { StorybookConfig } from "@storybook/react-vite";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { readdirSync } from "node:fs";
import type { UserConfig } from "vite";
import svgr from "vite-plugin-svgr";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const packagesDir = resolve(__dirname, "../../../packages");
const packageAliases = Object.fromEntries(
  readdirSync(packagesDir).map((pkg) => [
    `@bearlab/${pkg}`,
    resolve(packagesDir, pkg, "src/index.ts"),
  ])
);

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@chromatic-com/storybook"),
  ],
  framework: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: getAbsolutePath("@storybook/react-vite") as any,
    options: {},
  },
  viteFinal: async (config: UserConfig) => {
    return {
      ...config,
      plugins: [
        ...(config.plugins || []),
        svgr({
          svgrOptions: {
            icon: true,
            exportType: "named",
            namedExport: "ReactComponent",
          },
          include: "**/*.svg",
        }),
      ],
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          ...packageAliases,
        },
      },
      css: {
        modules: {
          localsConvention: "camelCase",
        },
      },
    };
  },
};

export default config;
