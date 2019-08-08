import handlebars from "handlebars";
import fs from "fs-extra";

const namePattern = /([^\/]+)\/([^\/]+\.js)$/;

class Result {

  constructor() {
    this._examples = {};
  }

  async partGenerated(part, name) {
    console.log(part, name);

    const [_, example, file] = namePattern.exec(name);
    const parts = this._examples[example] || (this._examples[example] = {});

    parts[part] = file;

    const { iife, es } = parts;

    if (iife && es) {
      await generateExampleHtml(example, parts);
    }
  }

}

const result = new Result();

export default {
  name: 'generate-example-html',
  generateBundle({ format }, bundle) {
    Object.keys(bundle).map(name => result.partGenerated(format, name));
  },
}

async function generateExampleHtml(example, parts) {

  const input =`./src/${example}/index.html`;
  const output = `./dist/${example}/index.html`;

  console.log('Generating HTML', input, '->', output);

  const template = handlebars.compile(await fs.readFile(input, 'utf8'));

  await fs.outputFile(output, template(parts), { encoding: 'utf8' });
}
