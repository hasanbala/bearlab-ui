import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import path from "path";
import replace from "@rollup/plugin-replace";
import svgr from "@svgr/rollup";

const packageName = process.env.PACKAGE_NAME;

if (!packageName) {
  throw new Error("PACKAGE_NAME environment variable is required");
}

const packagePath = path.resolve(`packages/${packageName}`);
const corePath = path.resolve("packages/core");
const rootPath = path.resolve(".");

const externalPackages = ["react", "react-dom", "classnames", /^@bearlab\/.*/];

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
      replace({
        preventAssignment: true,
        values: {
          "process.env.NODE_ENV": JSON.stringify(
            process.env.NODE_ENV || "development"
          ),
          "import.meta.env.NODE_ENV": JSON.stringify(
            process.env.NODE_ENV || "development"
          ),
        },
      }),
      resolve({
        browser: true,
        preferBuiltins: false,
      }),
      commonjs(),
      typescript({
        outputToFilesystem: true,
        tsconfig: path.join(packagePath, "tsconfig.json"),
        compilerOptions: {
          baseUrl: rootPath,
          skipLibCheck: true,
          paths: {
            "@bearlab/button": [path.join(rootPath, "packages/button")],
            "@bearlab/badge": [path.join(rootPath, "packages/badge")],
            "@bearlab/textarea": [path.join(rootPath, "packages/textarea")],
            "@bearlab/checkbox": [path.join(rootPath, "packages/checkbox")],
            "@bearlab/copy": [path.join(rootPath, "packages/copy")],
            "@bearlab/dropzone": [path.join(rootPath, "packages/dropzone")],
            "@bearlab/file-input": [path.join(rootPath, "packages/file-input")],
            "@bearlab/go-back": [path.join(rootPath, "packages/go-back")],
            "@bearlab/input": [path.join(rootPath, "packages/input")],
            "@bearlab/loading": [path.join(rootPath, "packages/loading")],
            "@bearlab/otp-form": [path.join(rootPath, "packages/otp-form")],
            "@bearlab/radio": [path.join(rootPath, "packages/radio")],
            "@bearlab/select": [path.join(rootPath, "packages/select")],
            "@bearlab/skeleton": [path.join(rootPath, "packages/skeleton")],
            "@bearlab/switch": [path.join(rootPath, "packages/switch")],
            "@bearlab/view-card": [path.join(rootPath, "packages/view-card")],
            "@bearlab/dropdown": [path.join(rootPath, "packages/dropdown")],
            "@bearlab/table": [path.join(rootPath, "packages/table")],
            "@bearlab/alert": [path.join(rootPath, "packages/alert")],
            "@bearlab/tab": [path.join(rootPath, "packages/tab")],
            "@bearlab/avatar": [path.join(rootPath, "packages/avatar")],
            "@bearlab/faq": [path.join(rootPath, "packages/faq")],
            "@bearlab/breadcrumb": [path.join(rootPath, "packages/breadcrumb")],
            "@bearlab/modal": [path.join(rootPath, "packages/modal")],
            "@bearlab/growl": [path.join(rootPath, "packages/growl")],
            "@bearlab/pricing": [path.join(rootPath, "packages/pricing")],
            "@bearlab/view-code": [path.join(rootPath, "packages/view-code")],
            "@bearlab/tag-input": [path.join(rootPath, "packages/tag-input")],
            "@bearlab/carousel": [path.join(rootPath, "packages/carousel")],
            "@bearlab/query-select": [
              path.join(rootPath, "packages/query-select"),
            ],
            "@bearlab/accordion": [path.join(rootPath, "packages/accordion")],
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
      svgr({
        exportType: "named",
        ref: true,
        svgo: false,
        titleProp: true,
      }),
    ],
    external: externalPackages,
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
      dts(),
      {
        name: "ignore-svg-and-style-types",
        resolveId(id) {
          if (
            id.endsWith(".svg") ||
            id.endsWith(".scss") ||
            id.endsWith(".css")
          ) {
            return { id: id, external: true };
          }
          return null;
        },
      },
    ],
    external: [...externalPackages, /\.svg$/, /\.scss$/, /\.css$/],
  },
];
