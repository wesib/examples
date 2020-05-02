import fs from 'fs-extra';
import handlebars from 'handlebars';
import '../src/template/index.ts';

const namePattern = /([^/\\]+)[/\\]([^/]+\.js)$/;
const rev = Date.now().toString(32);
const dist = './dist';

class Result {

  constructor() {
    this._examples = {};
  }

  async partGenerated(name) {

    const [, example, file] = namePattern.exec(name);

    if (example === 'js') {
      return; // Common chunk
    }

    const isHome = example === 'home';
    const parts = this._examples[example] || (this._examples[example] = {});
    const part = name.endsWith('.s.js') ? 'system' : 'module';

    parts[part] = `${example}/${file}`;

    const { module, system } = parts;

    if (module && system) {
      await generateExampleHtml(
          example,
          parts,
          isHome
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
  generateBundle(_, bundle) {
    return Promise.all(Object.keys(bundle).map(name => result.partGenerated(name)));
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
