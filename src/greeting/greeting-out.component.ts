import { ProduceStyle, Theme } from '@wesib/generic';
import { AttachShadow, Attribute, BootstrapWindow, Component, ComponentContext, Render } from '@wesib/wesib';
import { StypRules } from 'style-producer';
import { BEX__NS, DefaultStyle } from '../common';

@Component({
  name: ['greeting-out', BEX__NS],
})
@AttachShadow()
export class GreetingOutComponent {

  @Attribute()
  name?: string;

  constructor(private readonly _context: ComponentContext) {
  }

  @ProduceStyle()
  style(): StypRules {
    return this._context.get(Theme).style(DefaultStyle);
  }

  @Render()
  render() {

    const self = this;
    const document = this._context.get(BootstrapWindow).document;
    const content = document.createElement('span');

    this._context.contentRoot.append(content);

    return () => content.innerText = greetings();

    function greetings() {

      const name = self.name?.trim();

      return name ? `Hello, ${name}!` : 'Hello!';
    }
  }

}
