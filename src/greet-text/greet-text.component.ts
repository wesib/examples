import { ComponentNode, ComponentTreeSupport, ProduceStyle, Theme } from '@wesib/generic';
import { Component, ComponentContext } from '@wesib/wesib';
import { ValueSync } from 'fun-events';
import { InCssClasses, inCssInfo, InGroup, inGroup, inText, InValidation, requirePresent } from 'input-aspects';
import { StypProperties, stypRoot, stypRules, StypRules } from 'style-producer';
import { AppFeature, InputStyle, inStyle, roInStyle, ThemeSettings } from '../common';
import { FormThemeSettings } from '../common/theme';
import { GreetOutComponent } from './greet-out.component';

@Component({
  name: 'greet-text',
  feature: {
    needs: [
      GreetOutComponent,
      ComponentTreeSupport,
      AppFeature,
    ]
  },
})
export class GreetTextComponent {

  private readonly _theme: Theme;

  constructor(context: ComponentContext) {
    this._theme = context.get(Theme);

    context.whenOn(() => {

      const node = context.get(ComponentNode);
      const output = node.select('greet-out', { deep: true }).first;
      const group = inGroup<GreetData>({ name: '' });
      const nameSupply = node.select('input', { all: true, deep: true }).first(name => {
        group.controls.set(
            'name',
            name && inText(name.element)
                .setup(InValidation, validation => validation.by(requirePresent))
                .setup(InCssClasses, classes => classes.add(inCssInfo()))
        );
      });

      const nameSync = new ValueSync<string | null>('');

      nameSync.sync(output, o => o?.attribute('name'));
      nameSync.sync('in', group.controls, (controls: InGroup.Snapshot<GreetData>) => controls.get('name'));

      context.whenOff(() => {
        nameSync.done();
        nameSupply.off();
      });
    });
  }

  @ProduceStyle()
  style(): StypRules {

    const settings = this._theme.ref(ThemeSettings).read.keep;
    const formSettings = this._theme.ref(FormThemeSettings).read.keep;
    const root = stypRoot();
    const label = root.rules.add({ e: 'label' }, settings.thru(greetLabelStyle));

    label.rules.add({ e: 'input' }, settings.thru(greetFieldStyle));
    label.rules.add({ e: 'greet-out' }, formSettings.thru(inStyle))
        .add(settings.thru(greetFieldStyle))
        .add(formSettings.thru(roInStyle));

    return stypRules(
        this._theme.style(InputStyle),
        root.rules,
    );
  }

}

interface GreetData {
  name: string;
}

function greetLabelStyle(
    {
      $fontSize
    }: ThemeSettings,
): StypProperties {
  return {
    display: 'block',
    margin: 0,
    padding: `${$fontSize.div(2)}`,
  };
}

function greetFieldStyle(
    {
      $fontSize,
    }: ThemeSettings,
): StypProperties {
  return {
    display: 'block',
    margin: `${$fontSize.div(2)} 0 0 0`,
  };
}
