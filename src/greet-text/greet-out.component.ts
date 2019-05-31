import { AttachShadow, Attribute, BootstrapWindow, Component, ComponentContext, Render } from '@wesib/wesib';

@Component('greet-out')
@AttachShadow()
export class GreetOutComponent {

  @Attribute()
  name!: string;

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
