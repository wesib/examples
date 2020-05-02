import { getBabelOutputPlugin } from '@rollup/plugin-babel';
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
  output: [
    outputConfig(true),
    outputConfig(false),
  ],
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

function outputConfig(module) {

  const ext = module ? 'js' : 's.js';
  const plugins = [];

  if (!module) {
    plugins.push(getBabelOutputPlugin({
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'systemjs',
            targets: 'last 2 versions, ie 11',
          },
        ],
      ],
    }));
  }

  plugins.push(
      terser({
        ecma: module ? 6 : 5,
        module,
        toplevel: true,
        output: {
          ascii_only: true,
          comments: false,
        },
      }),
      exampleHtml,
  );

  return {
    format: 'esm',
    dir: './dist',
    sourcemap: true,
    compact: true,
    entryFileNames: `[name]/main.[hash].${ext}`,
    chunkFileNames: `js/[name].[hash].${ext}`,
    hoistTransitiveImports: false,
    plugins,
  };
}
