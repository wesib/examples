import { ProduceStyle, Theme } from '@wesib/generic';
import { AttachShadow, Attribute, BootstrapWindow, Component, ComponentContext, Render } from '@wesib/wesib';
import { StypRules } from 'style-producer';
import { DefaultStyle } from '../common';

@Component('greet-out')
@AttachShadow()
export class GreetOutComponent {

  @Attribute()
  name!: string;

  @ProduceStyle()
  get style(): StypRules {
    return this._context.get(Theme).style(DefaultStyle);
  }

  constructor(private readonly _context: ComponentContext) {
  }

  @Render()
  render() {

    const self = this;
    const document = this._context.get(BootstrapWindow).document;
    const content = document.createElement('span');

    this._context.contentRoot.append(content);

    return () => content.innerText = greetings();

    function greetings() {

      const name = self.name.trim();

      return name ? `Hello, ${name}!` : 'Hello!';
    }
  }

}
