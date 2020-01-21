import { ProduceStyle, Theme } from '@wesib/generic';
import {
  AttachShadow,
  Attribute,
  BootstrapWindow,
  Component,
  ComponentContext,
  ElementRender,
  Render,
} from '@wesib/wesib';
import { StypProperties, stypRules, StypRules } from 'style-producer';
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
  render(): ElementRender {

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

  const settings = theme.ref(ThemeSettings).read.keep;
  const formSettings = theme.ref(FormThemeSettings).read.keep;
  const { root: { rules } } = theme;

  return stypRules(
      rules.add(
          { u: [':', 'host'], $: GreetingOut__qualifier },
          formSettings.thru(inStyle),
      )
          .add(formSettings.thru(readonlyInStyle))
          .add(settings.thru(greetFieldStyle)),
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
