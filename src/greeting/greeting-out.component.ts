import { StypProperties, stypRules, StypRules } from '@frontmeans/style-producer';
import { ProduceStyle, Theme } from '@wesib/generic/styp';
import {
  AttachShadow,
  Attribute,
  BootstrapWindow,
  Component,
  ComponentContext,
  ElementRenderer,
  Render,
} from '@wesib/wesib';
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

  @Render()
  render(): ElementRenderer {

    const document = this._context.get(BootstrapWindow).document;
    const content = document.createElement('span');
    const greetings = (): string => {

      const name = this.name?.trim();

      return name ? `Hello, ${name}!` : 'Hello!';
    };

    this._context.contentRoot.append(content);

    return () => {
      content.innerText = greetings();
    };
  }

}

const GreetingOut__qualifier = 'bex:greeting-out';

function GreetingOutStyle(theme: Theme): StypRules {

  const settings = theme.ref(ThemeSettings).read();
  const formSettings = theme.ref(FormThemeSettings).read();
  const { root: { rules } } = theme;

  return stypRules(
      rules.add(
          { u: [':', 'host'], $: GreetingOut__qualifier },
          formSettings.keepThru(inStyle),
      )
          .add(formSettings.keepThru(readonlyInStyle))
          .add(settings.keepThru(greetFieldStyle)),
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
