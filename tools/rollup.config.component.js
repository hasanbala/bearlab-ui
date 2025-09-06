import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import path from "path";

const packageName = process.env.PACKAGE_NAME;

if (!packageName) {
  throw new Error("PACKAGE_NAME environment variable is required");
}

const packagePath = path.resolve(`packages/${packageName}`);
const corePath = path.resolve("packages/core");
const rootPath = path.resolve(".");

export default [
  {
    input: path.join(packagePath, "src/index.ts"),
    output: [
      {
        file: path.join(packagePath, "dist/index.js"),
        format: "cjs",
        sourcemap: true,
      },
      {
        file: path.join(packagePath, "dist/index.esm.js"),
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({
        browser: true,
        preferBuiltins: false,
      }),
      commonjs(),
      typescript({
        tsconfig: path.join(packagePath, "tsconfig.json"),
        declaration: true,
        declarationDir: path.join(packagePath, "dist/types"),
        outDir: path.join(packagePath, "dist"),
        rootDir: path.join(packagePath, "src"),
        compilerOptions: {
          baseUrl: rootPath,
          paths: {
            "@bearlab/core": [path.join(rootPath, "packages/core/src")],
            "@bearlab/view-error": [
              path.join(rootPath, "packages/view-error/src"),
            ],
            "@bearlab/button": [path.join(rootPath, "packages/button/src")],
            "@bearlab/badge": [path.join(rootPath, "packages/badge/src")],
            "@bearlab/textarea": [path.join(rootPath, "packages/textarea/src")],
            "@bearlab/hooks": [path.join(rootPath, "packages/hooks/src")],
            "@bearlab/checkbox": [path.join(rootPath, "packages/checkbox/src")],
            "@bearlab/copy": [path.join(rootPath, "packages/copy/src")],
            "@bearlab/dropzone": [path.join(rootPath, "packages/dropzone/src")],
            "@bearlab/file-input": [
              path.join(rootPath, "packages/fileInput/src"),
            ],
            "@bearlab/go-back": [path.join(rootPath, "packages/goBack/src")],
            "@bearlab/input": [path.join(rootPath, "packages/input/src")],
            "@bearlab/loading": [path.join(rootPath, "packages/loading/src")],
            "@bearlab/otp-form": [path.join(rootPath, "packages/otpForm/src")],
            "@bearlab/popover": [path.join(rootPath, "packages/popover/src")],
            "@bearlab/radio": [path.join(rootPath, "packages/radio/src")],
            "@bearlab/select": [path.join(rootPath, "packages/select/src")],
            "@bearlab/skeleton": [path.join(rootPath, "packages/skeleton/src")],
            "@bearlab/switch": [path.join(rootPath, "packages/switch/src")],
            "@bearlab/view-card": [
              path.join(rootPath, "packages/viewCard/src"),
            ],
          },
        },
      }),
      postcss({
        extract: true,
        minimize: true,
        use: ["sass"],
        includePaths: [
          path.join(corePath, "src/assets/styles"),
          path.join(packagePath, "src"),
        ],
      }),
    ],
    external: [
      "react",
      "react-dom",
      "@bearlab/core",
      "classnames",
      /^@bearlab\//,
    ],
  },
  {
    input: path.join(packagePath, "dist/types/index.d.ts"),
    output: [
      {
        file: path.join(packagePath, "dist/index.d.ts"),
        format: "esm",
      },
    ],
    plugins: [dts()],
    external: [
      "react",
      "react-dom",
      "@bearlab/core",
      "classnames",
      /^@bearlab\//,
    ],
  },
];
