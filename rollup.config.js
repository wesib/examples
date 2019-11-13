import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import sourcemaps from 'rollup-plugin-sourcemaps';
import nodeResolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';

import cleanup from './build/rollup-plugin-cleanup';
import exampleHtml from './build/rollup-plugin-example-html';

const examples = [
  'greet-text',
];

export default [
  exampleConfig('es'),
  exampleConfig('iife'),
];

function exampleConfig(format) {

  const iife = format === 'iife';
  const plugins = [
    typescript({
      typescript: require('typescript'),
      tsconfig: `tsconfig.${format}.json`,
      cacheRoot: 'target/.rts2_cache',
    }),
    cleanup(`./dist/**/*.${format}.{js,js.map}`),
    commonjs(),
    sourcemaps(),
    exampleHtml,
  ];

  if (iife) {
    // Use esm5 module variants
    plugins.push(
        nodeResolve(),
        babel(),
        uglify({
          output: {
            ascii_only: true,
          },
        }),
    );
  } else {
    plugins.push(
        nodeResolve(),
        terser({
          ecma: 6,
          module: true,
          toplevel: true,
          output: {
            ascii_only: true,
          },
        }),
    );
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
    output: {
      format,
      dir: './dist',
      sourcemap: true,
      entryFileNames: `[name]/main.[hash].${format}.js`,
      name: `wesib.examples`,
      extend: true,
    },
  };
}
