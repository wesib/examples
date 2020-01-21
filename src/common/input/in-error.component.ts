import { DefaultInAspects, HierarchyContext, InputFromControl, ProduceStyle, Theme } from '@wesib/generic';
import { AttributeChanged, Component, ComponentContext } from '@wesib/wesib';
import { afterAll, eventSupply, trackValue } from 'fun-events';
import { InCssClasses, inCssError, inCssInfo, InputAspects__NS, InStyledElement } from 'input-aspects';
import { QualifiedName } from 'namespace-aliaser';
import { StypLengthPt, stypRules, StypRules } from 'style-producer';
import { Examples__NS } from '../examples.ns';
import { FormThemeSettings } from './form.theme-settings';

@Component(['in-error', Examples__NS])
export class InErrorComponent {

  private readonly _codes = trackValue<string[]>();

  constructor(private readonly _context: ComponentContext) {
    afterAll({
      control: this._context.get(HierarchyContext).get(InputFromControl),
      aspects: this._context.get(DefaultInAspects),
      when: this._codes,
    }).consume(
        ({
          control: [{ control }],
          aspects: [aspects],
          when: [when],
        }) => {
          if (!control) {
            return;
          }

          const supply = eventSupply();

          control.convert(
              InStyledElement.to(_context.element),
              aspects,
          ).setup(
              InCssClasses,
              cssClasses => {
                cssClasses.add(inCssInfo()).needs(supply);
                cssClasses.add(inCssError({ when })).needs(supply);
              },
          );

          return supply;
        },
    );
  }

  @AttributeChanged('code')
  setCode(code: string): void {
    this._codes.it = code ? code.trim().split(/\s+/) : [];
  }

  @ProduceStyle()
  style(): StypRules.Source {
    return this._context.get(Theme).style(InErrorStyle);
  }

}

const InError__qualifier = 'bex:in-error';
const hasError__cssClass: QualifiedName = ['has-error', InputAspects__NS];

function InErrorStyle(theme: Theme): StypRules {

  const settings = theme.ref(FormThemeSettings).read.keep;
  const { root: { rules } } = theme;
  const borderW = StypLengthPt.of(4, 'px');

  return stypRules(
      rules.add(
          { u: [':', 'host'], $: InError__qualifier },
          settings.thru(({ $color, $errorFontSize }) => ({
            display: 'none',
            fontSize: $errorFontSize,
            padding: $errorFontSize.div(2),
            borderLeft: `${borderW} dotted ${$color}`,
            paddingLeft: $errorFontSize.sub(borderW),
          })),
      ),
      rules.add(
          {
            u: [
              ':',
              'host',
              {
                c: [hasError__cssClass, ['touched', InputAspects__NS]],
                u: [':', 'not', { c: ['has-focus', InputAspects__NS] }],
              },
            ],
            $: InError__qualifier,
          },
          {
            display: 'block',
          },
      ),
      rules.add(
          {
            u: [
              ':',
              'host',
              {
                c: hasError__cssClass,
                u: [
                  [':', 'not', { u: ['code', '~=', 'missing'] }],
                  [':', 'not', { u: ['code', '~=', 'incomplete'] }],
                ],
              },
            ],
            $: InError__qualifier,
          },
          {
            display: 'block',
          },
      ),
  );
}
