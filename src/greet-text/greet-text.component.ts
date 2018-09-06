import { AttributeChanged, ComponentContext, WesComponent } from '@wesib/wesib';

@WesComponent({ name: 'greet-text' })
export class GreetTextComponent {

  constructor(private readonly _context: ComponentContext) {
  }

  @AttributeChanged()
  name(oldValue: string | null, newValue: string) {
    this._context.element.innerText = `Hello, ${newValue}!`;
  }

}
