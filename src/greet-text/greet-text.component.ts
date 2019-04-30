import { Component, ComponentContext, Feature } from '@wesib/wesib';
import { ComponentNode, ComponentTreeSupport, ProduceStyle } from '@wesib/generic';
import { ValueSync } from 'fun-events';
import { GreetOutComponent } from './greet-out.component';
import { FormThemeSupport, Theme } from '../common/theme';
import { StypRules, stypSelectorText } from 'style-producer';

@Component('greet-text')
@Feature({
  needs: [
    GreetOutComponent,
    ComponentTreeSupport,
    FormThemeSupport,
  ]
})
export class GreetTextComponent {

  @ProduceStyle({
    render: {
      order: -0x1000000,
      render(producer, properties) {
        console.log(stypSelectorText(producer.selector), [...producer.rule.root.rules].length);
        producer.render(properties);
      },
    },
  })
  readonly style: StypRules;

  constructor(context: ComponentContext) {
    this.style = context.get(Theme).root.rules;

    const value = new ValueSync<String | null>(null);
    const node = context.get(ComponentNode);
    const input = node.select('input', { all: true }).first;
    const output = node.select('greet-out').first;

    value.sync('in', input, i => i && i.property<string>('value'));
    value.sync(output, o => o && o.attribute('name'));

    context.on('input')(event => value.it = (event.target as HTMLInputElement).value);
  }

}
