import { ActivateNavLink, HandleNavLinks } from '@wesib/generic';
import { ProduceStyle, Theme } from '@wesib/generic/styp';
import { Component, ComponentContext, Wesib__NS } from '@wesib/wesib';
import { StypColor, StypLengthPt, StypProperties, stypRules, StypRules } from 'style-producer';
import { Examples__NS } from '../examples.ns';
import { ThemeSettings } from '../theme';

@Component(
    ['nav', Examples__NS],
    HandleNavLinks(),
    ActivateNavLink(),
)
export class NavComponent {

  private readonly _theme: Theme;

  constructor(context: ComponentContext) {
    this._theme = context.get(Theme);
  }

  @ProduceStyle()
  style(): StypRules.Source {
    return this._theme.style(NavStyle);
  }

}

const Nav__qualifier = 'bex:nav';

function NavStyle(theme: Theme): StypRules {

  const settings = theme.ref(ThemeSettings).read.keep;
  const { root: { rules } } = theme;

  return stypRules(
      rules.add(
          { u: [':', 'host'], $: Nav__qualifier },
          settings.thru(navStyle),
      ),
      rules.add(
          { u: [':', 'host'], $: Nav__qualifier },
          settings.thru(sts => ({
            flex: '0 1 200px',
            height: '100%',
            background: navLinkBackground(sts),
          })),
      ),
      rules.add(
          { u: [':', 'host'], $: [Nav__qualifier, '@media:sm'] },
          {
            flex: '0 1 100%',
          },
      ),
      rules.add(
          [{ u: [':', 'host'], $: Nav__qualifier }, { e: 'a', $: Nav__qualifier }],
          settings.thru(navLinkStyle),
      ),
      rules.add(
          [{ u: [':', 'host'], $: Nav__qualifier }, { e: 'a', c: ['active', Wesib__NS], $: Nav__qualifier }],
          settings.thru(activeNavLinkStyle),
      ),
  );
}

function navStyle(
    {
      $fontSize,
    }: ThemeSettings,
): StypProperties {
  return {
    padding: 0,
    margin: `0 ${$fontSize.div(2)} 0 0`,
  };
}

export function navLinkBackground({ $bgColor }: ThemeSettings): StypColor {
  return $bgColor.hsl.set(({ l }) => ({ l: l * 0.8 }));
}

function navLinkStyle(
    settings: ThemeSettings,
): StypProperties {

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

function activeNavLinkStyle(
    {
      $fontSize,
      $color,
      $bgColor,
    }: ThemeSettings,
): StypProperties {

  const borderW = StypLengthPt.of(4, 'px');

  return {
    background: $bgColor,
    borderLeft: `${borderW} solid ${$color}`,
    paddingLeft: $fontSize.sub(borderW),
  };
}
