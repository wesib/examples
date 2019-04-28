import { Component, ComponentContext, Feature } from '@wesib/wesib';
import { ComponentNode, ComponentTreeSupport, ProduceStyle } from '@wesib/generic';
import { ValueSync } from 'fun-events';
import { GreetOutComponent } from './greet-out.component';
import { stypRoot } from 'style-producer';

const root = stypRoot();

root.rules.add(
    {
      e: 'input',
    }, {
      border: '1px solid gray',
      padding: '0.25em 0.5em',
    });

@Component('greet-text')
@Feature({
  needs: [
    GreetOutComponent,
    ComponentTreeSupport,
  ]
})
export class GreetTextComponent {

  @ProduceStyle()
  readonly style = root.rules;

  constructor(context: ComponentContext) {

    const value = new ValueSync<String | null>(null);
    const node = context.get(ComponentNode);
    const input = node.select('input', { all: true }).first;
    const output = node.select('greet-out').first;

    value.sync('in', input, i => i && i.property<string>('value'));
    value.sync(output, o => o && o.attribute('name'));

    context.on('input')(event => value.it = (event.target as HTMLInputElement).value);
  }

}
