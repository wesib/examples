import fs from 'fs-extra';
import handlebars from 'handlebars';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourcemaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';

import cleanup from './build/rollup-plugin-cleanup';

const namePattern = /([^\/]+)\/([^\/]+\.js)$/;
const examples = [
  'greet-text',
];

class Result {

  constructor() {
    this._examples = {};
  }

  async js(part, name) {

    const [_, example, file] = namePattern.exec(name);
    const parts = this._examples[example] || (this._examples[example] = {});

    parts[part] = file;

    const { iife, esm } = parts;

    if (iife && esm) {
      await generateExampleHtml(example, parts);
    }
  }

}

const result = new Result();

export default [
  exampleConfig('esm'),
  exampleConfig('iife'),
];

function exampleConfig(format) {

  const iife = format === 'iife';
  const generateHtml = {
    name: 'generate-html',
    writeBundle(bundle) {
      for (const name of Object.keys(bundle)) {
        result.js(format, name);
      }
    },
  };
  const plugins = [
    typescript({
      typescript: require('typescript'),
      tsconfig: `tsconfig.${format}.json`,
      cacheRoot: 'target/.rts2_cache',
    }),
    cleanup(`./dist/**/*.${format}.{js,js.map}`),
    commonjs(),
    sourcemaps(),
    generateHtml,
  ];

  if (iife) {
    // Use esm5 module variants
    plugins.push(
        nodeResolve({
          mainFields: ['esm5', 'module', 'main'],
        }),
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
      entryFileNames: `[name]/index.[hash].${format}.js`,
      name: `wesib.examples`,
      extends: true,
    },
  };
}

async function generateExampleHtml(example, parts) {

  const input =`./src/${example}/index.html`;
  const output = `./dist/${example}/index.html`;

  console.log('Generating HTML', input, '->', output);

  const template = handlebars.compile(await fs.readFile(input, 'utf8'));

  await fs.outputFile(output, template(parts), { encoding: 'utf8' });
}
