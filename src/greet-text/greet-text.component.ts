import { Attribute, ComponentContext, Render, WesComponent } from '@wesib/wesib';

@WesComponent('greet-text')
export class GreetTextComponent {

  @Attribute()
  name!: string;

  constructor(private readonly _context: ComponentContext) {
  }

  @Render()
  render() {
    this._context.element.innerText = `Hello, ${this.name}!`;
  }

}
