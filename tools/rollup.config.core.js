import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import path from "path";
import svgr from "@svgr/rollup";

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
        modules: true,
        sourceMap: true,
        sass: {
          silenceDeprecations: ["legacy-js-api"],
          includePaths: [path.join(packagePath, "src/assets/styles")],
        },
      }),
      svgr({
        exportType: "named",
        ref: true,
        svgo: false,
        titleProp: true,
      }),
      // svgr({
      //   exportType: "named",
      //   ref: true,
      //   titleProp: true,
      //   svgo: true,
      //   svgoConfig: {
      //     plugins: [
      //       {
      //         name: "preset-default",
      //         params: {
      //           overrides: {
      //             removeViewBox: false,
      //             removeDimensions: false,
      //             removeXMLNS: false,
      //           },
      //         },
      //       },
      //     ],
      //   },
      // }),
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
    plugins: [
      dts({
        compilerOptions: {
          skipDiagnostics: true,
          respectExternal: true,
        },
      }),
      {
        name: "resolve-svg",
        resolveId(id, importer) {
          if (id.endsWith(".svg")) {
            return { id: id, external: true };
          }
          return null;
        },
      },
    ],
    external: ["react", "react-dom", /\.svg$/],
  },
];
