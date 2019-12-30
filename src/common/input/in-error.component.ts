import { ComponentInValidity, ProduceStyle, Theme } from '@wesib/generic';
import { AttributeChanged, Component, ComponentContext, DefaultNamespaceAliaser, Render } from '@wesib/wesib';
import { itsEvery } from 'a-iterable';
import { InValidation, inValidationResult } from 'input-aspects';
import { css__naming, QualifiedName } from 'namespace-aliaser';
import { StypLengthPt, stypRules, StypRules } from 'style-producer';
import { Examples__NS } from '../examples.ns';
import { FormThemeSettings } from './form.theme-settings';

@Component(
    ['in-error', Examples__NS],
    ComponentInValidity,
)
export class InErrorComponent {

  private _validity: InValidation.Result = inValidationResult();
  private _codes = new Set<string>();

  constructor(private readonly _context: ComponentContext) {

    const validity = _context.get(ComponentInValidity);

    _context.whenOn(supply => {
      validity(r => this.validity = r)
          .needs(supply)
          .whenOff(() => this.validity = inValidationResult());
    });
  }

  get validity(): InValidation.Result {
    return this._validity;
  }

  set validity(value: InValidation.Result) {

    const oldValue = this._validity;

    this._validity = value;
    this._context.updateState('validationResult', value, oldValue);
  }

  @AttributeChanged('code')
  setCode(code: string) {
    this._codes = new Set(code.trim().split(/\s+/));
  }

  @Render()
  render() {

    const element: Element = this._context.element;
    const hasErrorsClassName = css__naming.name(
        hasError__cssClass,
        this._context.get(DefaultNamespaceAliaser),
    );

    return () => {
      if (itsEvery(this._codes, code => !this.validity.has(code))) {
        element.classList.remove(hasErrorsClassName);
      } else {
        element.classList.add(hasErrorsClassName);
      }
    };
  }

  @ProduceStyle()
  style(): StypRules {
    return this._context.get(Theme).style(InErrorStyle);
  }

}

const InError__qualifier = 'bex:in-error';
const hasError__cssClass: QualifiedName = ['display-block', Examples__NS];

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
          { u: [':', 'host', { c: hasError__cssClass }], $: InError__qualifier },
          {
            display: 'block',
          },
      ),
  );
}
