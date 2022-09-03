import {
  StypColor,
  StypLengthPt,
  StypProperties,
  stypRules,
  StypRules,
} from '@frontmeans/style-producer';
import { mapAfter } from '@proc7ts/fun-events';
import { mapIndexed } from '@proc7ts/push-iterator';
import { ProduceStyle, Theme } from '@wesib/css';
import { navAnchor, NavMenu } from '@wesib/navigation';
import { Component, ComponentContext, Wesib__NS } from '@wesib/wesib';
import { Examples__NS } from '../examples.ns';
import { ThemeSettings } from '../theme';

@Component(['nav', Examples__NS])
export class NavComponent {

  private readonly _theme: Theme;

  constructor(context: ComponentContext) {
    this._theme = context.get(Theme);
    new NavMenu(function ({ element }: { element: Element }) {
      return mapIndexed(element.querySelectorAll('a'), el => navAnchor(el));
    }).bindTo(context);
  }

  @ProduceStyle()
  style(): StypRules {
    return this._theme.style(NavStyle);
  }

}

const Nav__qualifier = 'bex:nav';

function NavStyle(theme: Theme): StypRules {
  const settings = theme.ref(ThemeSettings).read;
  const {
    root: { rules },
  } = theme;

  return stypRules(
    rules.add({ u: [':', 'host'], $: Nav__qualifier }, settings.do(mapAfter(navStyle))),
    rules.add(
      { u: [':', 'host'], $: Nav__qualifier },
      settings.do(
        mapAfter(sts => ({
          flex: '0 1 200px',
          height: '100%',
          background: navLinkBackground(sts),
        })),
      ),
    ),
    rules.add(
      { u: [':', 'host'], $: [Nav__qualifier, '@media:sm'] },
      {
        flex: '0 1 100%',
      },
    ),
    rules.add(
      [
        { u: [':', 'host'], $: Nav__qualifier },
        { e: 'a', $: Nav__qualifier },
      ],
      settings.do(mapAfter(navLinkStyle)),
    ),
    rules.add(
      [
        { u: [':', 'host'], $: Nav__qualifier },
        { e: 'a', c: ['active', Wesib__NS], $: Nav__qualifier },
      ],
      settings.do(mapAfter(activeNavLinkStyle)),
    ),
  );
}

function navStyle({ $fontSize }: ThemeSettings): StypProperties {
  return {
    padding: 0,
    margin: `0 ${$fontSize.div(2)} 0 0`,
  };
}

export function navLinkBackground({ $bgColor }: ThemeSettings): StypColor {
  return $bgColor.hsl.set(({ l }) => ({ l: l * 0.8 }));
}

function navLinkStyle(settings: ThemeSettings): StypProperties {
  const { $fontSize } = settings;

  return {
    display: 'block',
    margin: 0,
    padding: `${$fontSize.div(2)} ${$fontSize}`,
    border: 0,
    outline: 0,
    background: navLinkBackground(settings),
  };
}

function activeNavLinkStyle({ $fontSize, $color, $bgColor }: ThemeSettings): StypProperties {
  const borderW = StypLengthPt.of(4, 'px');

  return {
    background: $bgColor,
    borderLeft: `${borderW} solid ${$color}`,
    paddingLeft: $fontSize.sub(borderW),
  };
}
