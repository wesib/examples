import { Component, ComponentContext, Feature } from '@wesib/wesib';
import { ComponentNode, ComponentTreeSupport, ElementNode } from '@wesib/generic';
import { itsFirst } from 'a-iterable';
import { CachedEventProducer, ValueSync } from 'fun-events';
import { GreetOutComponent } from './greet-out.component';

@Component('greet-text')
@Feature({
  need: [
    GreetOutComponent,
    ComponentTreeSupport,
  ]
})
export class GreetTextComponent {

  constructor(context: ComponentContext) {

    const value = new ValueSync<String | null>(null);
    const node = context.get(ComponentNode);
    const ins = node.select('input', { all: true });

    value.sync(
        'in',
        CachedEventProducer.from<[ElementNode?]>(
            ins.onUpdate.thru(itsFirst),
            [itsFirst(ins)]),
        input => input && input.property<string>('value'));

    const outs = node.select('greet-out');

    value.sync(
        CachedEventProducer.from<[ComponentNode?]>(
            outs.onUpdate.thru(itsFirst),
            [itsFirst(outs)]),
        output => output && output.attribute('name'));

    context.on('input')(event => value.it = (event.target as HTMLInputElement).value);
  }

}
