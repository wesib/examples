import { ContextKey, SingleContextKey } from 'context-values';
import {
  NameInNamespace,
  NamespaceDef,
  StypProperties,
  stypRoot,
  StypRule,
  StypRuleList,
  stypSelector,
  StypSelector
} from 'style-producer';
import { BootstrapContext } from '@wesib/wesib';
import { StyleProvider } from './style-provider';
import { AfterEvent, afterEventBy, trackValue } from 'fun-events';
import { filterIt, itsFirst } from 'a-iterable';

const Theme__key = /*#__PURE__*/ new SingleContextKey<Theme>('theme');

export class Theme {

  static get key(): ContextKey<Theme> {
    return Theme__key;
  }

  private readonly _root = stypRoot();

  constructor(context: BootstrapContext) {
    context.get(StyleProvider).forEach(provider => provider(this));
  }

  get root(): StypRule {
    return this._root;
  }

  watch(selector: StypSelector): AfterEvent<[StypProperties]> {

    const sel = stypSelector(selector);

    return afterEventBy(
        this.root.rules.read
            .thru((rules: StypRuleList) => matchingRule(rules, sel))
            .dig((rule: StypRule | undefined) => rule ? rule.read : trackValue<StypProperties>({}).read),
        [{}]);
  }

}

function matchingRule(rules: StypRuleList, selector: StypSelector.Normalized): StypRule | undefined {
  return itsFirst(
      filterIt(
          rules,
          rule => stypSelectorsEqual(rule.selector, selector)));
}

function stypSelectorsEqual(first: StypSelector.Normalized, second: StypSelector.Normalized): boolean {
  if (first.length !== second.length) {
    return false;
  }
  return first.every((part, i) => stypSelectorPartsEqual(part, second[i]));
}

function stypSelectorPartsEqual(
    first: StypSelector.NormalizedPart | StypSelector.Combinator,
    second: StypSelector.NormalizedPart | StypSelector.Combinator): boolean {
  if (typeof first === 'string') {
    return first === second;
  }
  if (typeof second === 'string') {
    return false;
  }
  return namespacesEqual(first.ns, second.ns)
      && namesEqual(first.e, second.e)
      && namesEqual(first.i, second.i)
      && classesEqual(first.c, second.c)
      && qualifiersEqual(first.$, second.$);
}

function namespacesEqual(first: string | NamespaceDef | undefined, second: string | NamespaceDef | undefined): boolean {
  if (!first || typeof first === 'string') {
    return first === second;
  }
  if (!second || typeof second === 'string') {
    return false;
  }
  return first.url === second.url;
}

function namesEqual(first: NameInNamespace | undefined, second: NameInNamespace | undefined): boolean {
  if (!first || typeof first === 'string') {
    return first === second;
  }
  if (!second || typeof second === 'string') {
    return false;
  }
  return first[0] === second[0] && first[1].url === second[1].url;
}

function classesEqual(
    first: readonly (string | NameInNamespace)[] | undefined,
    second: readonly (string | NameInNamespace)[] | undefined): boolean {
  if (!first) {
    return !second;
  }
  if (!second) {
    return false;
  }
  return first.length === second.length && first.every((name, i) => namesEqual(name, second[i]));
}

function qualifiersEqual(first: readonly string[] | undefined, second: readonly string[] | undefined): boolean {
  if (!first) {
    return !second;
  }
  if (!second) {
    return false;
  }
  return first.length === second.length && first.every((qualifier, i) => qualifier === second[i]);
}
