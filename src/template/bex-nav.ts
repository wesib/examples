import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as path from 'path';

Handlebars.registerPartial(
    'bex-nav',
    fs.readFileSync(path.resolve(__dirname, 'src', 'template', 'bex-nav.htm')).toString(),
);
