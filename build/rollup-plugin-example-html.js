import handlebars from 'handlebars';
import fs from 'fs-extra';
import '../src/template/index.ts';

const namePattern = /([^/\\]+)[/\\]([^/]+\.js)$/;
const rev = Date.now().toString(32);
const dist = './dist';

class Result {

  constructor() {
    this._examples = {};
  }

  async partGenerated(format, name) {

    const [, example, file] = namePattern.exec(name);

    if (example === 'js') {
      return; // Common chunk
    }

    const isTitle = example === 'title';
    const parts = this._examples[example] || (this._examples[example] = {});
    const part = format === 'es' || format === 'esm' ? 'module' : 'system';

    parts[part] = `${example}/${file}`;

    const { module, system } = parts;

    if (module && system) {
      await generateExampleHtml(
          example,
          parts,
          isTitle
              ? {
                output: `${dist}/index.html`,
                base: '.',
              }
              : {},
      );
    }
  }

}

const result = new Result();

export default {
  name: 'generate-example-html',
  generateBundle({ format }, bundle) {
    return Promise.all(Object.keys(bundle).map(name => result.partGenerated(format, name)));
  },
};

async function generateExampleHtml(
    example,
    parts,
    {
      output = `${dist}/${example}/index.html`,
      base = '..',
    } = {},
) {

  const input = `./src/${example}/index.html`;

  console.log('Generating HTML', input, '->', output);

  const template = handlebars.compile(await fs.readFile(input, 'utf8'));

  await fs.outputFile(output, template({ ...parts, rev, base }), { encoding: 'utf8' });
}
