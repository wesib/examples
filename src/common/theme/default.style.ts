import { Theme } from '@wesib/generic';
import { StypProperties, StypRules } from 'style-producer';
import { ThemeSettings } from './theme-settings';

export function DefaultStyle(theme: Theme): StypRules {

  const settings = theme.ref(ThemeSettings).read.keep;

  theme.root.add(settings.thru(defaultStyle));

  return theme.root.rules.self;
}

function defaultStyle(
    {
      $color,
    }: ThemeSettings
): StypProperties {
  return {
    color: $color,
  };
}
