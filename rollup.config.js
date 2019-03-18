import alias from 'rollup-plugin-alias';
import fs from 'fs-extra';
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

function pkg(module) {
  return require(`${module}/package.json`);
}

function esm5(module) {
  return require.resolve(`${module}/${pkg(module).esm5}`);
}

function esm5aliases(...modules) {
  return alias(modules.reduce((aliases, module) => ({ ...aliases, [module]: esm5(module) }), {}));
}

function exampleConfigs(example) {

  const srcDir = `./src/${example}`;
  const destDir = `./dist/${example}`;

  class Result {

    constructor() {
      this._js = {};
    }

    async js(format, name) {
      this._js[format] = name.replace(/(?:.+\/)([^\/]+\.js)$/, '$1');

      const { iife, esm } = this._js;

      if (iife && esm) {
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

    const iife = format === 'iife';
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

    if (iife) {
      // Use esm5 module variants
      plugins.push(
          nodeResolve({
            only: [
              'tslib'
            ],
          }),
          esm5aliases(
              '@wesib/wesib',
              '@wesib/generic',
              'a-iterable',
              'call-thru',
              'context-values',
              'fun-events',
          ),
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
            keep_classnames: true,
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
    exampleConfig(example, 'iife'),
  ]
}

const configs = examples.reduce((prev, example) => [...prev, ...exampleConfigs(example)], []);

export default configs;
