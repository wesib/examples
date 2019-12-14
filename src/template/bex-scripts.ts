import * as Handlebars from 'handlebars';

Handlebars.registerPartial(
    'bex-scripts',
    `
<script src="{{module}}" type="module"></script>
<script src="js/s.js" nomodule></script>
<script src="{{system}}" nomodule></script>
    `.trim(),
);
