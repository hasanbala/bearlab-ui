import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import path from "path";

const packagePath = path.resolve("packages/core");

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
      }),
      postcss({
        extract: true,
        minimize: true,
        use: ["sass"],
        includePaths: [path.join(packagePath, "src/assets/styles")],
      }),
    ],
    external: ["react", "react-dom"],
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
    external: ["react", "react-dom"],
  },
];
