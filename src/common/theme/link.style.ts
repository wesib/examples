import { Theme } from '@wesib/generic';
import { StypProperties, StypRules } from 'style-producer';
import { ThemeSettings } from './theme-settings';

export function LinkStyle(theme: Theme): StypRules {

  const settings = theme.ref(ThemeSettings).read.keep;
  const selector = { e: 'a' };

  theme.root.rules.add(selector, settings.thru(linkStyle));
  theme.root.rules.add({ e: 'a', s: ':visited' }, settings.thru(linkStyle));
  theme.root.rules.add({ e: 'a', s: ':hover' }, { textDecoration: 'underline' });
  theme.root.rules.add({ e: 'a', s: ':active' }, { textDecoration: 'underline dotted' });
  theme.root.rules.add({ e: 'a', s: ':focus' }, { textDecoration: 'underline dotted' });

  return theme.root.rules.grab(selector);
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
