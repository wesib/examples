import fs from 'fs-extra';
import handlebars from 'handlebars';
import '../src/template/index.ts';

const namePattern = /([^/\\]+)[/\\]([^/]+\.js)$/;
const rev = Date.now().toString(32);
const dist = './dist';

export default {
  name: 'generate-example-html',
  generateBundle(_, bundle) {
    return Promise.all(Object.keys(bundle).map(generatePage));
  },
};

async function generatePage(name) {

  const [, example, file] = namePattern.exec(name);

  if (example === 'js') {
    return; // Common chunk
  }

  let output = `${dist}/${example}/index.html`;
  let base = '..';

  if (example === 'home') {
    output = `${dist}/index.html`;
    base = '.';
  }

  const input = `./src/${example}/index.html`;

  console.log('Generating HTML', input, '->', output);

  const template = handlebars.compile(await fs.readFile(input, 'utf8'));

  await fs.outputFile(
      output,
      template({ module: `${example}/${file}`, rev, base }),
      { encoding: 'utf8' },
  );
}

