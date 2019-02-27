import { AttachShadow, Attribute, BootstrapWindow, Component, ComponentContext, Render } from '@wesib/wesib';

@Component('greet-out')
@AttachShadow()
export class GreetOutComponent {

  @Attribute()
  name!: string;

  private readonly _content: HTMLSpanElement;

  constructor(context: ComponentContext) {

    const document = context.get(BootstrapWindow).document;

    this._content = document.createElement('span');
    context.contentRoot.append(this._content);
  }

  @Render()
  render() {
    this._content.innerText = `Hello, ${this.name}!`;
  }

}
