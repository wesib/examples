import { Theme } from '@wesib/generic';
import { StypProperties, stypRules, StypRules } from 'style-producer';
import { ThemeSettings } from './theme-settings';

export function BodyStyle(theme: Theme): StypRules {

  const settings = theme.ref(ThemeSettings).read.keep;
  const selector = { e: 'body' };

  theme.root.rules.add(selector, settings.thru(bodyStyle));

  return stypRules(
      theme.root.rules.self,
      theme.root.rules.grab(selector),
  );
}

function bodyStyle(
    {
      $bgColor,
    }: ThemeSettings
): StypProperties {
  return {
    backgroundColor: $bgColor,
  };
}
