import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";

export default [
  {
    input: "src/index.ts",
    output: [
      { file: "dist/index.esm.js", format: "esm", sourcemap: true },
      {
        file: "dist/index.cjs.js",
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
    ],
    plugins: {},
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        extract: true, // dist/index.css
        modules: true, // *.module.scss → CSS Modules
        use: [
          [
            "sass",
            {
              silenceDeprecations: ["legacy-js-api"],
            },
          ],
        ],
        minimize: true,
        sourceMap: true,
      }),
    ],
  },

  {
    input: "dist/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
