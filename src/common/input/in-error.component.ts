import { HierarchyContext, InputFromControl, inputValidity, ProduceStyle, Theme } from '@wesib/generic';
import { AttributeChanged, Component, ComponentContext, DefaultNamespaceAliaser, Render } from '@wesib/wesib';
import { filterIt, itsEach, itsEvery, overEntries } from 'a-iterable';
import { DeltaSet } from 'delta-set';
import { InCssClasses, InValidation, inValidationResult } from 'input-aspects';
import { css__naming, QualifiedName } from 'namespace-aliaser';
import { StypLengthPt, stypRules, StypRules } from 'style-producer';
import { Examples__NS } from '../examples.ns';
import { FormThemeSettings } from './form.theme-settings';

@Component(['in-error', Examples__NS])
export class InErrorComponent {

  private _validity: InValidation.Result = inValidationResult();
  private readonly _cssClasses = new DeltaSet<string>();
  private _codes = new Set<string>();

  constructor(private readonly _context: ComponentContext) {
    inputValidity(_context)(validity => this.validity = validity);
    this._context.get(HierarchyContext).get(InputFromControl).consume(
        ({ control }) => control?.aspect(InCssClasses).read(map => {
          this._cssClasses.clear();
          itsEach(
              filterIt(
                  overEntries(map),
                  ([, flag]) => !!flag,
              ),
              ([name]) => this._cssClasses.add(name),
          );
          _context.updateState('cssClasses', this._cssClasses, this._cssClasses);
        }),
    );
  }

  get validity(): InValidation.Result {
    return this._validity;
  }

  set validity(value: InValidation.Result) {

    const oldValue = this._validity;

    this._validity = value;
    this._context.updateState('validity', value, oldValue);
  }

  @AttributeChanged('code')
  setCode(code: string) {
    this._codes = new Set(code.trim().split(/\s+/));
  }

  @Render()
  render() {

    const element: Element = this._context.element;
    const { classList } = element;
    const hasErrorsClassName = css__naming.name(
        hasError__cssClass,
        this._context.get(DefaultNamespaceAliaser),
    );
    const cssDeltaReceiver: DeltaSet.DeltaReceiver<string> = {
      add: name => classList.add(name),
      delete: name => classList.remove(name),
    };

    return () => {
      if (itsEvery(this._codes, code => !this.validity.has(code))) {
        classList.remove(hasErrorsClassName);
      } else {
        classList.add(hasErrorsClassName);
      }
      this._cssClasses.redelta(cssDeltaReceiver).undelta();
    };
  }

  @ProduceStyle()
  style(): StypRules {
    return this._context.get(Theme).style(InErrorStyle);
  }

}

const InError__qualifier = 'bex:in-error';
const hasError__cssClass: QualifiedName = ['has-error', Examples__NS];

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
              ':', 'host',
              {
                c: hasError__cssClass,
                u: [':', 'not', { c: 'inap-has-focus' }],
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
              ':', 'host',
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
