import { ComponentNode, ComponentTreeSupport, ProduceStyle, Theme } from '@wesib/generic';
import { BootstrapContext, Component, ComponentContext } from '@wesib/wesib';
import { ValueSync } from 'fun-events';
import { InCssClasses, inCssInfo, InGroup, inGroup, inText, InValidation, requirePresent } from 'input-aspects';
import { StypProperties, stypRoot, stypRules, StypRules } from 'style-producer';
import { AppFeature, BEX__NS, InputStyle, inStyle, readonlyInStyle, ThemeSettings } from '../common';
import { FormThemeSettings } from '../common/theme';
import { GreetingOutComponent } from './greeting-out.component';

@Component({
  name: ['greeting', BEX__NS],
  feature: {
    needs: [
      GreetingOutComponent,
      ComponentTreeSupport,
      AppFeature,
    ],
  },
})
export class GreetingComponent {

  constructor(private readonly _context: ComponentContext) {
    _context.whenOn(supply => {

      const node = _context.get(ComponentNode);
      const output = node.select(GreetingOutComponent, { deep: true }).first;
      const group = inGroup<GreetData>({ name: '' });

      node.select('input', { all: true, deep: true }).first({
            supply,
            receive(_ctx, name) {
              group.controls.set(
                  'name',
                  name && inText(name.element)
                      .setup(InValidation, validation => validation.by(requirePresent))
                      .setup(InCssClasses, classes => classes.add(inCssInfo())),
              );
            },
          },
      );

      const nameSync = new ValueSync<string | null>('');

      nameSync.sync(output, o => o?.attribute('name'));
      nameSync.sync('in', group.controls, (controls: InGroup.Snapshot<GreetData>) => controls.get('name'));

      supply.whenOff(() => nameSync.done());
    });
  }

  @ProduceStyle()
  async style(): Promise<StypRules> {

    const bsContext = this._context.get(BootstrapContext);
    const { elementDef: { name: outName } } = await bsContext.whenDefined(GreetingOutComponent);
    const theme = this._context.get(Theme);
    const settings = theme.ref(ThemeSettings).read.keep;
    const formSettings = theme.ref(FormThemeSettings).read.keep;
    const root = stypRoot();
    const label = root.rules.add({ e: 'label' }, settings.thru(greetLabelStyle));

    label.rules.add({ e: 'input' }, settings.thru(greetFieldStyle));
    label.rules.add({ e: outName }, formSettings.thru(inStyle))
        .add(formSettings.thru(readonlyInStyle))
        .add(settings.thru(greetFieldStyle));

    return stypRules(
        theme.style(InputStyle),
        root.rules,
    );
  }

}

interface GreetData {
  name: string;
}

function greetLabelStyle(
    {
      $fontSize,
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
