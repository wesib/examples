import { ComponentInControl, ComponentNode, ElementNode, ProduceStyle } from '@wesib/generic';
import { Component, ComponentContext } from '@wesib/wesib';
import { AfterEvent, eventSupply, noEventSupply, trackValue } from 'fun-events';
import { InControl, inText } from 'input-aspects';
import { stypRoot, StypRules } from 'style-producer';
import { BEX__NS } from '../bex.ns';

@Component({
  name: ['in-element', BEX__NS],
  setup: ComponentInControl.setup,
})
export class InElementComponent<Ctrl extends InControl<any> = InControl<any>> {

  private readonly _control = trackValue<Ctrl>();
  readonly control: AfterEvent<[Ctrl?]> = this._control.read;

  constructor(context: ComponentContext) {

    const inControl = context.get(ComponentInControl);
    const root = context.get(ComponentNode);

    context.whenOn(onSupply => {

      const supply = eventSupply().needs(onSupply);
      let inSupply = noEventSupply();

      root.select(this.inputSelector(), { all: true, deep: true })
          .first({
            supply,
            receive: (_ctx, node ) => {
              this._control.it = node && this.nodeControl(node);
            },
          });
      this._control.read({
        supply,
        receive: (_ctx, ctrl) => {
          inSupply.off();
          if (ctrl) {
            inSupply = inControl.enable(ctrl)
                .needs(supply)
                .whenOff(() => this._control.it = undefined);
          }
        },
      });
    });
  }

  @ProduceStyle()
  inputStyle(): StypRules.Source {
    return stypRoot({
      display: 'block',
    }).rules;
  }

  protected inputSelector(): string {
    return 'input';
  }

  protected nodeControl(node: ElementNode): Ctrl {
    return inText(node.element) as any;
  }

}
