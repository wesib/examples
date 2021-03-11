import { InCssClasses, inCssError, inCssInfo, InputAspects__NS, InStyledElement } from '@frontmeans/input-aspects';
import { QualifiedName } from '@frontmeans/namespace-aliaser';
import { StypLengthPt, stypRules, StypRules } from '@frontmeans/style-producer';
import { AfterEvent, mapAfter, mapAfter_, trackValue, translateAfter_ } from '@proc7ts/fun-events';
import { adjacentToField, Field, FieldShare, SharedField } from '@wesib/generic/forms';
import { ProduceStyle, Theme } from '@wesib/generic/styp';
import { Attribute, Component, ComponentContext } from '@wesib/wesib';
import { Examples__NS } from '../examples.ns';
import { FormThemeSettings } from './form.theme-settings';

class FieldErrorShare extends FieldShare {

  constructor() {
    super('field-error');
  }

}

@Component(['field-error', Examples__NS])
export class FieldErrorComponent {

  private readonly _code = trackValue<string | null>();

  @SharedField({
    share: {
      share: FieldErrorShare,
      local: true,
    },
    name: '',
  })
  readonly indicator: Field<void>;

  constructor(private readonly _context: ComponentContext) {

    const when: AfterEvent<string[]> = this._code.read
        .do(
            translateAfter_((send, code) => code ? send(...code.trim().split(/\s+/)) : send()),
        );

    this.indicator = adjacentToField<void>(builder => when.do(
        mapAfter_((...when) => ({
          control: builder.adjusted.control
              .convert<void>(InStyledElement.to(_context.element))
              .setup(InCssClasses, css => css.add(inCssInfo()))
              .setup(InCssClasses, css => css.add(inCssError({ when }))),
        })),
    ));
  }

  @Attribute({ updateState: false })
  get code(): string | null | undefined {
    return this._code.it;
  }

  set code(code: string | null | undefined) {
    this._code.it = code;
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
