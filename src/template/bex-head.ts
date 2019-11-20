import * as Handlebars from 'handlebars';

Handlebars.registerPartial(
    'bex-head',
    `
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>{{title}}</title>
<meta name="wesib-app-rev" content="{{{rev}}}">
<base href="{{{base}}}"/>
    `.trim(),
);
