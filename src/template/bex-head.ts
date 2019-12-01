import * as Handlebars from 'handlebars';

Handlebars.registerPartial(
    'bex-head',
    `
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>{{title}}</title>
<meta name="wesib-app-rev" content="{{{rev}}}">
<base href="{{{base}}}"/>
<link href="https://fonts.googleapis.com/css?family=Exo+2:400,600&display=swap" rel="stylesheet">
    `.trim(),
);
