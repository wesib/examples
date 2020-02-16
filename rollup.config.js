import 'ts-node/register';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import path from 'path';
import babel from 'rollup-plugin-babel';
import sourcemaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import ts from 'rollup-plugin-typescript2';
import typescript from 'typescript';

import cleanup from './build/rollup-plugin-cleanup';
import exampleHtml from './build/rollup-plugin-example-html';

const examples = [
  'greeting',
  'home',
];

export default [
  exampleConfig('module'),
  exampleConfig('system'),
];

function exampleConfig(format) {

  const module = format === 'module';
  const ext = format[0];
  const plugins = [
    ts({
      typescript,
      tsconfig: module ? 'tsconfig.json' : 'tsconfig.es5.json',
      cacheRoot: 'target/.rts2_cache',
    }),
    cleanup(`./dist/**/*.${ext}.{js,js.map}`),
    commonjs(),
    sourcemaps(),
    nodeResolve(),
    exampleHtml,
    terser({
      ecma: module ? 6 : 5,
      module,
      toplevel: true,
      output: {
        ascii_only: true,
        comments: false,
      },
    }),
  ];

  if (!module) {
    plugins.push(babel());
  }

  return {
    plugins,
    input: examples.reduce(
        (prev, example) => ({
          ...prev,
          [example]: `./src/${example}/index.ts`,
        }),
        {},
    ),
    manualChunks(id) {
      if (id.startsWith(path.join(__dirname, 'src', 'common') + path.sep)) {
        return 'common';
      }
      if (id.includes(`${path.sep}node_modules${path.sep}@wesib${path.sep}`)) {
        return 'wesib';
      }
      if (id.startsWith('\0') || id.includes(`${path.sep}node_modules${path.sep}`)) {
        return 'lib';
      }
    },
    output: {
      format: module ? 'esm' : 'system',
      dir: './dist',
      sourcemap: true,
      compact: true,
      entryFileNames: `[name]/main.[hash].${ext}.js`,
      chunkFileNames: `js/[name].[hash].${ext}.js`,
      hoistTransitiveImports: false,
    },
  };
}
