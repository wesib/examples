import { ContextKey, SingleContextKey } from 'context-values';
import { StypProperties, stypRoot, StypRule, StypRuleHierarchy, StypRuleList, StypSelector } from 'style-producer';
import { BootstrapContext } from '@wesib/wesib';
import { StyleProvider } from './style-provider';
import { AfterEvent } from 'fun-events';

const Theme__key = /*#__PURE__*/ new SingleContextKey<Theme>('theme');

export class Theme {

  static get key(): ContextKey<Theme> {
    return Theme__key;
  }

  private _root?: StypRule ;

  constructor(private readonly _context: BootstrapContext) {
  }

  get root(): StypRule {
    if (!this._root) {
      this._root = stypRoot();
      this._context.get(StyleProvider).forEach(provider => provider(this));
    }
    return this._root;
  }

  get rules(): StypRuleHierarchy {
    return this.root.rules;
  }

  watch(selector: StypSelector): AfterEvent<[StypProperties]> {
    return this.root.rules.watch(selector);
  }

}
