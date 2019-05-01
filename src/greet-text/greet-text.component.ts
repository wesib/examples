import { Component, ComponentContext, Feature } from '@wesib/wesib';
import { ComponentNode, ComponentTreeSupport, ProduceStyle } from '@wesib/generic';
import { ValueSync } from 'fun-events';
import { GreetOutComponent } from './greet-out.component';
import { FormThemeSupport, Theme } from '../common/theme';
import { StypRules } from 'style-producer';

@Component('greet-text')
@Feature({
  needs: [
    GreetOutComponent,
    ComponentTreeSupport,
    FormThemeSupport,
  ]
})
export class GreetTextComponent {

  private _style?: StypRules;

  @ProduceStyle()
  get style(): StypRules {
    return this._style || (this._style = this._context.get(Theme).root.rules.grab({ e: 'input' }));
  }

  constructor(private readonly _context: ComponentContext) {

    const value = new ValueSync<String | null>(null);
    const node = _context.get(ComponentNode);
    const input = node.select('input', { all: true }).first;
    const output = node.select('greet-out').first;

    value.sync('in', input, i => i && i.property<string>('value'));
    value.sync(output, o => o && o.attribute('name'));

    _context.on('input')(event => value.it = (event.target as HTMLInputElement).value);
  }

}
