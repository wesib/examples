import fs from 'fs-extra';
import glob from 'glob';
import handlebars from 'handlebars';
import rimraf from 'rimraf';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import hash from 'rollup-plugin-hash';
import sourcemaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';

const examples = [
  'greet-text',
];

function exampleConfigs(example) {

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

    const tsconfig = format === 'esm' ? 'tsconfig.esm2015.json' : 'tsconfig.json';
    const file = format === 'esm' ? `${destDir}/index.esm2015.js` : `${destDir}/index.js`;
    const plugins = [];

    if (format === 'esm') {
      plugins.push(
          terser({
            module: true,
            keep_classnames: true,
          }),
          hash({
            dest: `${destDir}/index.[hash].esm2015.js`,
            replace: true,
            callback(name) {
              result.js(format, name);
            }
          }),
          cleanup(`${destDir}/*.esm2015.{js,js.map}`),
      );
    } else {
      plugins.push(
          uglify({
            compress: {
              typeofs: false,
            },
            output: {
              ascii_only: true,
            },
          }),
          hash({
            dest: `${destDir}/index.[hash].js`,
            replace: true,
            callback(name) {
              result.js(format, name);
            }
          }),
          cleanup(`${destDir}/!(*.esm2015).{js,js.map}`),
      );
    }

    return {
      plugins: [
        commonjs(),
        typescript({
          typescript: require('typescript'),
          tsconfig,
          cacheRoot: 'target/.rts2_cache',
        }),
        nodeResolve({
          module: format !== 'esm',
          jsnext: format === 'esm',
          main: false,
          preferBuiltins: false,
        }),
        sourcemaps(),
        ...plugins,
      ],
      input: `${srcDir}/index.ts`,
      output: {
        format,
        sourcemap: true,
        name: `wesib.examples.${example.replace(/\//, '.')}`,
        file,
      },
    };
  }

  return [
    exampleConfig(example, 'esm'),
    exampleConfig(example, 'umd'),
  ]
}

function cleanup(what) {

  function clear() {
    return new Promise((resolve, reject) => glob(what, (err, files) => {
      if (err) {
        reject(err);
      } else {
        rimraf(what, (err) => {
          if (err) {
            reject(err);
          } else {
            console.log('Removed files', files.join(', '));
            resolve();
          }
        })
      }
    }));
  }

  return {
    name: 'cleanup',
    buildStart: clear,
    load: clear,
  };
}

const configs = examples.reduce((prev, example) => [...prev, ...exampleConfigs(example)], []);

export default configs;
