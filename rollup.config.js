import 'ts-node/register';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import sourcemaps from 'rollup-plugin-sourcemaps';
import nodeResolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

import cleanup from './build/rollup-plugin-cleanup';
import exampleHtml from './build/rollup-plugin-example-html';

const examples = [
  'greeting',
  'title',
];

export default [
  exampleConfig('module'),
  exampleConfig('system'),
];

function exampleConfig(format) {

  const module = format === 'module';
  const ext = format[0];
  const plugins = [
    typescript({
      typescript: require('typescript'),
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
      if (id.startsWith(`${__dirname}/src/common/`)) {
        return 'common';
      }
      if (id.includes('/node_modules/@wesib/')) {
        return 'wesib';
      }
      if (id.startsWith('\0') || id.includes('/node_modules/')) {
        return 'lib';
      }
    },
    output: {
      format: module ? 'esm' : 'system',
      dir: './dist',
      sourcemap: true,
      entryFileNames: `[name]/main.[hash].${ext}.js`,
      chunkFileNames: `js/[name].[hash].${ext}.js`
    },
  };
}
