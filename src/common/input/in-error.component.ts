import { ComponentInValidity, ProduceStyle, Theme } from '@wesib/generic';
import { AttributeChanged, Component, ComponentContext, DefaultNamespaceAliaser, Render } from '@wesib/wesib';
import { itsEvery } from 'a-iterable';
import { InValidation, inValidationResult } from 'input-aspects';
import { css__naming } from 'namespace-aliaser';
import { StypLengthPt, stypRoot, StypRules } from 'style-producer';
import { BEX__NS } from '../bex.ns';
import { displayBlockCssClass } from '../theme';
import { FormThemeSettings } from './form.theme-settings';

@Component(
    ['in-error', BEX__NS],
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
        displayBlockCssClass,
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

    const borderW = StypLengthPt.of(4, 'px');
    const settings = this._context.get(Theme).ref(FormThemeSettings).read.keep;

    return stypRoot(
        settings.thru(({ $color, $errorFontSize }) => ({
          display: 'none',
          fontSize: $errorFontSize,
          padding: $errorFontSize.div(2),
          borderLeft: `${borderW} dotted ${$color}`,
          paddingLeft: $errorFontSize.sub(borderW),
        })),
    ).rules;
  }

}
