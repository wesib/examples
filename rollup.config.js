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
  exampleConfig('module'),
  exampleConfig('es5'),
];

function exampleConfig(format) {

  const es5 = format === 'es5';
  const plugins = [
    typescript({
      typescript: require('typescript'),
      tsconfig: es5 ? `tsconfig.es5.json` : "tsconfig.json",
      cacheRoot: 'target/.rts2_cache',
    }),
    cleanup(`./dist/**/*.${format}.{js,js.map}`),
    commonjs(),
    sourcemaps(),
    exampleHtml,
  ];

  if (es5) {
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
      format: es5 ? 'iife' : 'esm',
      dir: './dist',
      sourcemap: true,
      entryFileNames: `[name]/main.[hash].${format}.js`,
      name: `wesib.examples`,
      extend: true,
    },
  };
}
