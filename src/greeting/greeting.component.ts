import { ComponentNode, ElementNode, inputFromControl, ProduceStyle, Theme } from '@wesib/generic';
import { Component, ComponentContext } from '@wesib/wesib';
import { ValueSync } from 'fun-events';
import { InCssClasses, inCssInfo, InGroup, inGroup, inText, InValidation, requirePresent } from 'input-aspects';
import { StypProperties, stypRules, StypRules } from 'style-producer';
import { AppFeature, Examples__NS, InputStyle, ThemeSettings } from '../common';
import { greetFieldStyle, GreetingOutComponent } from './greeting-out.component';

@Component(
    ['greeting', Examples__NS],
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

      const node = _context.get(ComponentNode);
      const group = inGroup<GreetData>({ name: '' });

      node.select('input', { all: true, deep: true }).first.tillOff(supply)(
          nameNode => group.controls.set(
              'name',
              nameNode && inText(nameNode.element)
                  .setup(InValidation, validation => validation.by(requirePresent))
                  .setup(InCssClasses, classes => classes.add(inCssInfo())),
          ),
      );

      inputFromControl(_context, group).needs(supply);

      const output = node.select(GreetingOutComponent, { deep: true }).first.tillOff(supply);
      const sync = new ValueSync<string | null>('');

      sync.sync(output, o => o?.attribute('name'));
      sync.sync(
          'in',
          group.controls.read,
          controls => controls?.get('name'),
      );

      supply.whenOff(reason => {
        sync.done(reason);
        group.done(reason);
        group.controls.set({});
      });
    });
  }

  @ProduceStyle()
  style(): StypRules {
    return this._context.get(Theme).style(GreetingStyle);
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

const Greeting__qualifier = 'bex:greeting';

function GreetingStyle(theme: Theme): StypRules {

  const settings = theme.ref(ThemeSettings).read.keep;
  const { root: { rules } } = theme;
  const label = rules.add(
      [{ u: [':', 'host'] }, { e: 'label', $: Greeting__qualifier }],
      settings.thru(greetLabelStyle),
  );

  return stypRules(
      theme.style(InputStyle),
      label,
      label.rules.add(
          { e: 'input', $: Greeting__qualifier },
          settings.thru(greetFieldStyle),
      ),
  );
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
