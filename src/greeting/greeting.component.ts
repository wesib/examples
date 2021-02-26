import { inText, InValidation, requirePresent } from '@frontmeans/input-aspects';
import { StypProperties, stypRules, StypRules } from '@frontmeans/style-producer';
import { mapAfter, ValueSync } from '@proc7ts/fun-events';
import { Field, SharedField } from '@wesib/generic/forms';
import { ProduceStyle, Theme } from '@wesib/generic/styp';
import { BootstrapContext, Component, ComponentContext, ComponentSlot, trackAttribute } from '@wesib/wesib';
import { AppFeature, Examples__NS, FormStyle, ThemeSettings } from '../common';
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

  @SharedField()
  name!: Field<string>;

  constructor(private readonly _context: ComponentContext) {

    const bsContext = _context.get(BootstrapContext);

    _context.whenConnected(() => {

      const element: Element = _context.element;
      const nameElement = element.querySelector('input')!;

      this.name = Field.by(
          opts => inText(nameElement, opts)
              .setup(InValidation, validation => validation.by(requirePresent)),
      );

      bsContext.whenDefined(GreetingOutComponent)(({ elementDef: { tagName: outName } }) => {

        const outElement = element.querySelector(outName!)!;

        ComponentSlot.of(outElement).whenReady(outCtx => {

          const sync = new ValueSync<string | null>('');
          const nameAttr = trackAttribute(outCtx, 'name');

          sync.sync(nameAttr);
          sync.sync('in', this.name, name => name && name.control);

          _context.supply
              .cuts(sync)
              .cuts(nameAttr);
        });
      });
    });
  }

  @ProduceStyle()
  style(): StypRules {
    return this._context.get(Theme).style(GreetingStyle);
  }

}

const Greeting__qualifier = 'bex:greeting';

function GreetingStyle(theme: Theme): StypRules {

  const settings = theme.ref(ThemeSettings).read;
  const { root: { rules } } = theme;
  const label = rules.add(
      [{ u: [':', 'host'], $: Greeting__qualifier }, { e: 'label', $: Greeting__qualifier }],
      settings.do(mapAfter(greetLabelStyle)),
  );

  return stypRules(
      theme.style(FormStyle),
      label,
      label.rules.add(
          { e: 'input', $: Greeting__qualifier },
          settings.do(mapAfter(greetFieldStyle)),
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
