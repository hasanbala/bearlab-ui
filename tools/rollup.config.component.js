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
          skipLibCheck: true,
          paths: {
            "@bearlab/core": [path.join(rootPath, "packages/core")],
            "@bearlab/button": [path.join(rootPath, "packages/button")],
            "@bearlab/badge": [path.join(rootPath, "packages/badge")],
            "@bearlab/textarea": [path.join(rootPath, "packages/textarea")],
            "@bearlab/hooks": [path.join(rootPath, "packages/hooks")],
            "@bearlab/checkbox": [path.join(rootPath, "packages/checkbox")],
            "@bearlab/copy": [path.join(rootPath, "packages/copy")],
            "@bearlab/dropzone": [path.join(rootPath, "packages/dropzone")],
            "@bearlab/file-input": [path.join(rootPath, "packages/fileInput")],
            "@bearlab/go-back": [path.join(rootPath, "packages/goBack")],
            "@bearlab/input": [path.join(rootPath, "packages/input")],
            "@bearlab/loading": [path.join(rootPath, "packages/loading")],
            "@bearlab/otp-form": [path.join(rootPath, "packages/otpForm")],
            "@bearlab/radio": [path.join(rootPath, "packages/radio")],
            "@bearlab/select": [path.join(rootPath, "packages/select")],
            "@bearlab/skeleton": [path.join(rootPath, "packages/skeleton")],
            "@bearlab/switch": [path.join(rootPath, "packages/switch")],
            "@bearlab/view-card": [path.join(rootPath, "packages/viewCard")],
            "@bearlab/dropdown": [path.join(rootPath, "packages/dropdown")],
            "@bearlab/table": [path.join(rootPath, "packages/table")],
            "@bearlab/alert": [path.join(rootPath, "packages/alert")],
            "@bearlab/tab": [path.join(rootPath, "packages/tab")],
            "@bearlab/avatar": [path.join(rootPath, "packages/avatar")],
          },
        },
      }),
      postcss({
        extract: false,
        inject: true,
        minimize: true,
        modules: true,
        sourceMap: true,
        sass: {
          silenceDeprecations: ["legacy-js-api"],
          includePaths: [
            path.join(corePath, "src/assets/styles"),
            path.join(packagePath, "src"),
          ],
        },
      }),
    ],
    external: [
      "react",
      "react-dom",
      "@bearlab/core",
      "classnames",
      "@bearlab/button",
      "@bearlab/badge",
      "@bearlab/textarea",
      "@bearlab/hooks",
      "@bearlab/checkbox",
      "@bearlab/copy",
      "@bearlab/dropzone",
      "@bearlab/file-input",
      "@bearlab/go-back",
      "@bearlab/input",
      "@bearlab/loading",
      "@bearlab/otp-form",
      "@bearlab/radio",
      "@bearlab/select",
      "@bearlab/skeleton",
      "@bearlab/switch",
      "@bearlab/view-card",
      "@bearlab/dropdown",
      "@bearlab/table",
      "@bearlab/alert",
      "@bearlab/tab",
      "@bearlab/avatar",
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
      "@bearlab/button",
      "@bearlab/badge",
      "@bearlab/textarea",
      "@bearlab/hooks",
      "@bearlab/checkbox",
      "@bearlab/copy",
      "@bearlab/dropzone",
      "@bearlab/file-input",
      "@bearlab/go-back",
      "@bearlab/input",
      "@bearlab/loading",
      "@bearlab/otp-form",
      "@bearlab/radio",
      "@bearlab/select",
      "@bearlab/skeleton",
      "@bearlab/switch",
      "@bearlab/view-card",
      "@bearlab/dropdown",
      "@bearlab/table",
      "@bearlab/alert",
      "@bearlab/tab",
      "@bearlab/avatar",
    ],
  },
];
