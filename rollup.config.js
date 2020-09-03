import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import path from 'path';
import sourcemaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import ts from 'rollup-plugin-typescript2';
import 'ts-node/register';
import typescript from 'typescript';

import cleanup from './build/rollup-plugin-cleanup';
import exampleHtml from './build/rollup-plugin-example-html';

const examples = [
  'greeting',
  'home',
];

export default {
  input: examples.reduce(
      (prev, example) => ({
        ...prev,
        [example]: `./src/${example}/index.ts`,
      }),
      {},
  ),
  plugins: [
    ts({
      typescript,
      tsconfig: 'tsconfig.json',
      cacheRoot: 'target/.rts2_cache',
    }),
    cleanup(`./dist/**/*.{js,js.map}`),
    commonjs(),
    sourcemaps(),
    nodeResolve(),
  ],
  manualChunks,
  output: {
    plugins: [
      terser({
        ecma: 2018,
        module: true,
        toplevel: true,
        output: {
          ascii_only: true,
          comments: false,
        },
      }),
      exampleHtml,
    ],
    format: 'esm',
    dir: './dist',
    sourcemap: true,
    compact: true,
    entryFileNames: `[name]/main.[hash].js`,
    chunkFileNames: `js/[name].[hash].js`,
  },
};

function manualChunks(id) {
  if (id.startsWith(path.join(__dirname, 'src', 'common') + path.sep)) {
    return 'common';
  }
  if (id.includes(`${path.sep}node_modules${path.sep}@wesib${path.sep}`)) {
    return 'wesib';
  }
  if (id.startsWith('\0') || id.includes(`${path.sep}node_modules${path.sep}`)) {
    return 'lib';
  }
}
