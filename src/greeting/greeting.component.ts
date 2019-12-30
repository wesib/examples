import { componentInElement, ComponentNode, ElementNode, ProduceStyle, Theme } from '@wesib/generic';
import { BootstrapContext, Component, ComponentContext } from '@wesib/wesib';
import { ValueSync } from 'fun-events';
import { InCssClasses, inCssInfo, InGroup, inGroup, inText, InValidation, requirePresent } from 'input-aspects';
import { StypProperties, stypRoot, stypRules, StypRules } from 'style-producer';
import {
  AppFeature,
  BEX__NS,
  FormThemeSettings,
  InputStyle,
  inStyle,
  readonlyInStyle,
  ThemeSettings,
} from '../common';
import { GreetingOutComponent } from './greeting-out.component';

const greetingInRef = componentInElement({
  selector: 'input',
  control: node => inText(node.element)
      .setup(InValidation, validation => validation.by(requirePresent))
      .setup(InCssClasses, classes => classes.add(inCssInfo())),
});

@Component(
    ['greeting', BEX__NS],
    greetingInRef,
    {
      feature: {
        needs: [
          GreetingOutComponent,
          AppFeature,
        ],
      },
    },
)
export class GreetingComponent {

  constructor(private readonly _context: ComponentContext) {
    _context.whenOn(supply => {

      const greetingIn = _context.get(greetingInRef).tillOff(supply);
      const group = inGroup<GreetData>({ name: '' });

      greetingIn(name => group.controls.set('name', name))
          .whenOff(() => group.controls.remove('name'));

      const node = _context.get(ComponentNode);
      const output = node.select(GreetingOutComponent, { deep: true }).first;
      const sync = new ValueSync<string | null>('');

      sync.sync(output, o => o?.attribute('name'));
      sync.sync(
          'in',
          group.controls.read,
          controls => controls?.get('name'),
      );

      supply.whenOff(() => sync.done());
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

  protected nodeControl(node: ElementNode): InGroup<GreetData> {

    const group = inGroup<GreetData>({ name: '' });

    group.controls.set(
        'name',
        inText(node.element)
            .setup(InValidation, validation => validation.by(requirePresent))
            .setup(InCssClasses, classes => classes.add(inCssInfo())),
    );

    return group;
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
