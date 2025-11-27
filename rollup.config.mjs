import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";

export default [
  {
    input: {
      index: "src/index.ts",
      "react-hook-form": "src/integrations-react-hook-form.ts",
    },
    output: [
      {
        dir: "dist",
        format: "esm",
        sourcemap: true,
        entryFileNames: "[name].esm.js", // index.esm.js, react-hook-form.esm.js
      },
      {
        dir: "dist",
        format: "cjs",
        sourcemap: true,
        exports: "named",
        entryFileNames: "[name].cjs.js", // index.cjs.js, react-hook-form.cjs.js
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.build.json" }),
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
    input: {
      index: "dist/types/index.d.ts",
      "react-hook-form": "dist/types/integrations-react-hook-form.d.ts",
    },
    output: [
      {
        dir: "dist",
        format: "esm",
        entryFileNames: "[name].d.ts", // index.d.ts, react-hook-form.d.ts
      },
    ],
    plugins: [dts()],
  },
];
