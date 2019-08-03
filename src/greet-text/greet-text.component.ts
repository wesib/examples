import { ComponentNode, ComponentTreeSupport, ProduceStyle, Theme } from '@wesib/generic';
import { Component, ComponentContext, Feature } from '@wesib/wesib';
import { ValueSync } from 'fun-events';
import { InCssClasses, inCssInfo, InGroup, inGroup, inText, InValidation, requirePresent } from 'input-aspects';
import { StypRules } from 'style-producer';
import { AppFeature, InputStyle } from '../common';
import { GreetOutComponent } from './greet-out.component';

@Component('greet-text')
@Feature({
  needs: [
    GreetOutComponent,
    ComponentTreeSupport,
    AppFeature,
  ]
})
export class GreetTextComponent {

  @ProduceStyle()
  get style(): StypRules {
    return this._context.get(Theme).style(InputStyle);
  }

  constructor(private readonly _context: ComponentContext) {

    const node = _context.get(ComponentNode);
    const output = node.select('greet-out').first;
    const group = inGroup<GreetData>({ name: '' });

    node.select('input', { all: true }).first(name => {
      group.controls.set(
          'name',
          name && inText(name.element)
          .setup(InValidation, validation => validation.by(requirePresent))
          .setup(InCssClasses, classes => classes.add(inCssInfo()))
      );
    });

    const nameSync = new ValueSync<string | null>('');

    nameSync.sync(output, o => o && o.attribute('name'));
    nameSync.sync('in', group.controls, (controls: InGroup.Snapshot<GreetData>) => controls.get('name'));
  }

}

interface GreetData {
  name: string;
}
