import alias from 'rollup-plugin-alias';
import fs from 'fs-extra';
import path from 'path';
import handlebars from 'handlebars';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import hash from 'rollup-plugin-hash';
import sourcemaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';

import cleanup from './build/rollup-plugin-cleanup';

const examples = [
  'greet-text',
];

function esm5(module) {

  const dir = require.resolve(module);
  const esm5 = require(`${module}/package.json`).esm5;

  return path.resolve(dir, '..', '..', esm5);
}

function esm5aliases(...modules) {

  const aliases = {};

  modules.forEach(module => aliases[module] = esm5(module));

  return alias(aliases);
}

function exampleConfigs(example) {

  const modulesDir = `${__dirname}/node_modules`;
  const srcDir = `./src/${example}`;
  const destDir = `./dist/${example}`;

  class Result {

    constructor() {
      this._js = {};
    }

    async js(format, name) {
      this._js[format] = name.replace(/(?:.+\/)([^\/]+\.js)$/, '$1');

      const { umd, esm } = this._js;

      if (umd && esm) {
        await this._generateHtml();
      }
    }

    async _generateHtml() {

      const input =`${srcDir}/index.html`;
      const output = `${destDir}/index.html`;

      console.log('Generating HTML', input, '->', output);

      const template = handlebars.compile(await fs.readFile(input, 'utf8'));

      await fs.outputFile(output, template(this._js), { encoding: 'utf8' });
    }

  }

  const result = new Result();

  function exampleConfig(example, format) {

    const umd = format === 'umd';
    const plugins = [
      typescript({
        typescript: require('typescript'),
        tsconfig: `tsconfig.${format}.json`,
        cacheRoot: 'target/.rts2_cache',
      }),
      commonjs(),
      sourcemaps(),
      hash({
        dest: `${destDir}/index.[hash].${format}.js`,
        replace: true,
        callback(name) {
          result.js(format, name);
        }
      }),
      cleanup(`${destDir}/*.${format}.{js,js.map}`),
    ];

    if (umd) {
      plugins.push(
          nodeResolve({
            only: [
              'tslib'
            ],
          }),
          esm5aliases(
              '@wesib/wesib',
              'a-iterable',
              'call-thru',
              'context-values',
              'fun-events',
          ),
          uglify({
            compress: {
              typeofs: false,
            },
            output: {
              ascii_only: true,
            },
          }),
      );
    } else {
      plugins.push(
          // Use es2015 module variants
          nodeResolve(),
          terser({
            module: true,
            keep_classnames: true,
          }),
      );
    }

    return {
      plugins,
      input: `${srcDir}/index.ts`,
      output: {
        format,
        sourcemap: true,
        name: `wesib.examples.${example.replace(/\//, '.')}`,
        file: `${destDir}/index.${format}.js`,
      },
    };
  }

  return [
    exampleConfig(example, 'esm'),
    exampleConfig(example, 'umd'),
  ]
}

const configs = examples.reduce((prev, example) => [...prev, ...exampleConfigs(example)], []);

export default configs;
