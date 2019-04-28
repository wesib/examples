import { Component, ComponentContext, Feature } from '@wesib/wesib';
import { ComponentNode, ComponentTreeSupport } from '@wesib/generic';
import { ValueSync } from 'fun-events';
import { GreetOutComponent } from './greet-out.component';

@Component('greet-text')
@Feature({
  needs: [
    GreetOutComponent,
    ComponentTreeSupport,
  ]
})
export class GreetTextComponent {

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
