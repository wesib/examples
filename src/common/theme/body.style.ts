import { Theme } from '@wesib/generic';
import { StypProperties, stypRules, StypRules } from 'style-producer';
import { DefaultStyle } from './default.style';
import { ThemeSettings } from './theme-settings';

export function BodyStyle(theme: Theme): StypRules {

  const settings = theme.ref(ThemeSettings).read.keep;
  const selector = { e: 'body' };

  theme.root.rules.add(selector, settings.thru(bodyStyle));

  return stypRules(
      theme.style(DefaultStyle),
      theme.root.rules.grab(selector),
  );
}

function bodyStyle(
    {
      $bgColor,
      $fontSize,
    }: ThemeSettings
): StypProperties {
  return {
    backgroundColor: $bgColor,
    padding: $fontSize,
  };
}
