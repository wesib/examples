import { Attribute, ComponentContext, Render, WesComponent, BootstrapContext } from '@wesib/wesib';
import { AttachShadow } from '@wesib/wesib';

@WesComponent('greet-text')
@AttachShadow()
export class GreetTextComponent {

  @Attribute()
  name!: string;

  private readonly _content: HTMLSpanElement;

  constructor(context: ComponentContext) {

    const document = context.get(BootstrapContext.windowKey).document;

    this._content = document.createElement('span');
    context.contentRoot.append(this._content);
  }

  @Render()
  render() {
    this._content.innerText = `Hello, ${this.name}!`;
  }

}
