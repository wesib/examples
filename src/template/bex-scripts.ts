import * as Handlebars from 'handlebars';

Handlebars.registerPartial(
    'bex-scripts',
    '<script src="{{module}}" type="module"></script>',
);
