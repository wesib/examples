import { Theme } from '@wesib/generic/styp';
import { StypProperties, stypRules, StypRules } from 'style-producer';
import { ThemeSettings } from './theme-settings';

export function LinkStyle(theme: Theme): StypRules {

  const settings = theme.ref(ThemeSettings).read();
  const { root: { rules } } = theme;

  return stypRules(
      rules.add({ e: 'a' }, settings.keepThru(linkStyle)),
      rules.add({ e: 'a', s: ':visited' }, settings.keepThru(linkStyle)),
      rules.add({ e: 'a', s: ':hover' }, { textDecoration: 'underline' }),
      rules.add({ e: 'a', s: ':active' }, { textDecoration: 'underline dotted' }),
      rules.add({ e: 'a', s: ':focus' }, { textDecoration: 'underline dotted' }),
  );
}

function linkStyle(
    {
      $color,
      $linkFontWeight,
    }: ThemeSettings,
): StypProperties {
  return {
    color: $color,
    fontWeight: $linkFontWeight,
    textDecoration: 'none',
  };
}
