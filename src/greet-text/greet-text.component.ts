import { Component, ComponentContext, Feature } from '@wesib/wesib';
import { ComponentNode, ComponentTreeSupport, ElementNode } from '@wesib/generic';
import { itsFirst } from 'a-iterable';
import { noEventInterest, ValueSync } from 'fun-events';
import { GreetOutComponent } from './greet-out.component';

@Component('greet-text')
@Feature({
  need: [
      GreetOutComponent,
      ComponentTreeSupport,
  ]
})
export class GreetTextComponent {

  private _value = new ValueSync<String | null>(null);
  private _in?: ElementNode;
  private _inInterest = noEventInterest();
  private _out?: ComponentNode;
  private _outInterest = noEventInterest();

  constructor(context: ComponentContext) {

    const node = context.get(ComponentNode);

    const ins = node.select('input', { all: true });

    this.in = itsFirst(ins);
    ins.onUpdate(i => this.in = itsFirst(i));

    const outs = node.select('greet-out');

    this.out = itsFirst(outs);
    outs.onUpdate(o => this.out = itsFirst(o));

    context.on('input')(event => this._value.it = (event.target as HTMLInputElement).value);
  }

  get in(): ElementNode | undefined {
    return this._in;
  }

  set in(value: ElementNode | undefined) {
    if (this._in === value) {
      return;
    }
    this._inInterest.off();
    this._in = value;
    if (value) {

      const inputValue = value.attribute('value');

      this._value.it = inputValue.it;
      this._inInterest = this._value.sync(inputValue);
    }
  }

  get out(): ComponentNode | undefined {
    return this._out;
  }

  set out(value: ComponentNode | undefined) {
    if (this._out === value) {
      return;
    }
    this._outInterest.off();
    this._out = value;
    if (value) {
      this._outInterest = this._value.sync(value.attribute('name'));
    }
  }

}
