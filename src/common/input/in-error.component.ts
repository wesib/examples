import { InCssClasses, inCssError, inCssInfo, InputAspects__NS, InStyledElement } from '@frontmeans/input-aspects';
import { QualifiedName } from '@frontmeans/namespace-aliaser';
import { StypLengthPt, stypRules, StypRules } from '@frontmeans/style-producer';
import { AfterEvent, mapAfter, mapAfter_ } from '@proc7ts/fun-events';
import { ConvertInput } from '@wesib/generic/input';
import { ProduceStyle, Theme } from '@wesib/generic/styp';
import { Attributes, Component, ComponentContext, trackAttribute } from '@wesib/wesib';
import { Examples__NS } from '../examples.ns';
import { FormThemeSettings } from './form.theme-settings';

@Component(
    ['in-error', Examples__NS],
    Attributes('code'),
    ConvertInput(
        ({ control: { control }, aspects, context }) => {

          const codes: AfterEvent<[string[]]> = trackAttribute(context, 'code')
              .read
              .do(
                  mapAfter_(code => code ? code.trim().split(/\s+/) : []),
              );

          return codes.do(
              mapAfter(when => control.convert(
                  InStyledElement.to(context.element),
                  aspects,
              ).setup(
                  InCssClasses,
                  cssClasses => {
                    cssClasses.add(inCssInfo());
                    cssClasses.add(inCssError({ when }));
                  },
              )),
          );
        },
    ),
)
export class InErrorComponent {

  constructor(private readonly _context: ComponentContext) {
  }

  @ProduceStyle()
  style(): StypRules {
    return this._context.get(Theme).style(InErrorStyle);
  }

}

const InError__qualifier = 'bex:in-error';
const hasError__cssClass: QualifiedName = ['has-error', InputAspects__NS];

function InErrorStyle(theme: Theme): StypRules {

  const settings = theme.ref(FormThemeSettings).read;
  const { root: { rules } } = theme;
  const borderW = StypLengthPt.of(4, 'px');

  return stypRules(
      rules.add(
          { u: [':', 'host'], $: InError__qualifier },
          settings.do(mapAfter(({ $color, $errorFontSize }) => ({
            display: 'none',
            fontSize: $errorFontSize,
            padding: $errorFontSize.div(2),
            borderLeft: `${borderW} dotted ${$color}`,
            paddingLeft: $errorFontSize.sub(borderW),
          }))),
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
