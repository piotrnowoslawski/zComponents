import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import postcssScss from "postcss-scss";
import dts from "rollup-plugin-dts";

const sassConfig = [
  [
    "sass",
    {
      silenceDeprecations: ["legacy-js-api"],
    },
  ],
];

const postcssBase = {
  modules: true,
  parser: postcssScss, // ✅ IMPORTANT: parse SCSS correctly
  use: sassConfig,
  minimize: true,
  sourceMap: true,
};

const makeCssOnlyBuild = ({ input, cssFileName, jsEntryFileName }) => ({
  input,
  output: [
    {
      dir: "dist",
      format: "esm",
      sourcemap: true,
      entryFileNames: jsEntryFileName,
    },
  ],
  plugins: [
    // CSS-only builds do not need peerDepsExternal/resolve/commonjs/typescript,
    // because they only import SCSS modules.
    postcss({
      ...postcssBase,
      extract: cssFileName,
    }),
  ],
});

export default [
  // --------------------------------------------
  // 1) Main builds (JS ESM + CJS) + GLOBAL CSS
  // --------------------------------------------
  {
    input: {
      index: "src/index.ts",
      "react-hook-form": "src/integrations-react-hook-form.ts",
      "styles-all": "src/styles/all.css.ts",
    },
    output: [
      {
        dir: "dist",
        format: "esm",
        sourcemap: true,
        entryFileNames: "[name].esm.js",
      },
      {
        dir: "dist",
        format: "cjs",
        sourcemap: true,
        exports: "named",
        entryFileNames: "[name].cjs.js",
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.build.json" }),
      postcss({
        ...postcssBase,
        extract: "zcomponents-ui.css",
      }),
    ],
  },
  // --------------------------------------------
  // 2) Per-component CSS outputs
  // --------------------------------------------
  makeCssOnlyBuild({
    input: "src/styles/zdrop.css.ts",
    cssFileName: "zdrop.css",
    jsEntryFileName: "zdrop.css-entry.js",
  }),

  makeCssOnlyBuild({
    input: "src/styles/zdropbutton.css.ts",
    cssFileName: "zdropbutton.css",
    jsEntryFileName: "zdropbutton.css-entry.js",
  }),

  makeCssOnlyBuild({
    input: "src/styles/zrange.css.ts",
    cssFileName: "zrange.css",
    jsEntryFileName: "zrange.css-entry.js",
  }),
  // --------------------------------------------
  // 3) Type declarations
  // --------------------------------------------
  {
    input: {
      index: "dist/types/index.d.ts",
      "react-hook-form": "dist/types/integrations-react-hook-form.d.ts",
    },
    output: [
      {
        dir: "dist",
        format: "esm",
        entryFileNames: "[name].d.ts",
      },
    ],
    plugins: [dts()],
  },
];
