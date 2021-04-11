import { nodeDocument } from '@frontmeans/dom-primitives';
import { StypProperties, stypRules, StypRules } from '@frontmeans/style-producer';
import { mapAfter } from '@proc7ts/fun-events';
import { FragmentRendererExecution, RenderFragment } from '@wesib/generic';
import { ProduceStyle, Theme } from '@wesib/generic/styp';
import { AttachShadow, Attribute, Component, ComponentContext } from '@wesib/wesib';
import { DefaultStyle, Examples__NS, FormThemeSettings, inStyle, readonlyInStyle, ThemeSettings } from '../common';

@Component(['greeting-out', Examples__NS])
@AttachShadow()
export class GreetingOutComponent {

  @Attribute()
  name?: string;

  constructor(private readonly _context: ComponentContext) {
  }

  @ProduceStyle()
  style(): StypRules {
    return this._context.get(Theme).style(GreetingOutStyle);
  }

  @RenderFragment()
  render({ content }: FragmentRendererExecution): void {

    const doc = nodeDocument(content);

    content.appendChild(doc.createTextNode(this._greeting()));
  }

  private _greeting(): string {

    const name = this.name?.trim();

    return name ? `Hello, ${name}!` : 'Hello!';
  }

}

const GreetingOut__qualifier = 'bex:greeting-out';

function GreetingOutStyle(theme: Theme): StypRules {

  const settings = theme.ref(ThemeSettings).read;
  const formSettings = theme.ref(FormThemeSettings).read;
  const { root: { rules } } = theme;

  return stypRules(
      rules.add(
          { u: [':', 'host'], $: GreetingOut__qualifier },
          formSettings.do(mapAfter(inStyle)),
      )
          .add(formSettings.do(mapAfter(readonlyInStyle)))
          .add(settings.do(mapAfter(greetFieldStyle))),
      theme.style(DefaultStyle),
  );
}

export function greetFieldStyle(
    {
      $fontSize,
    }: ThemeSettings,
): StypProperties {
  return {
    display: 'block',
    margin: `${$fontSize.div(2)} 0 0 0`,
  };
}
