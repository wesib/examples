import { Theme } from '@wesib/generic';
import { StypProperties, stypRules, StypRules } from 'style-producer';
import { DefaultStyle } from './default.style';
import { ThemeSettings } from './theme-settings';

export function BodyStyle(theme: Theme): StypRules {

  const settings = theme.ref(ThemeSettings).read.keep;
  const bodySelector = { e: 'body' };
  const htmlSelector = { e: 'html' };

  theme.root.rules.add(bodySelector, settings.thru(bodyStyle));
  theme.root.rules.add(
      htmlSelector,
      {
        height: '100%',
        margin: 0,
        padding: 0,
      },
  );

  return stypRules(
      theme.root.rules.grab(htmlSelector),
      theme.root.rules.grab(bodySelector),
      theme.style(DefaultStyle),
  );
}

function bodyStyle(
    {
      $bgColor,
    }: ThemeSettings,
): StypProperties {
  return {
    backgroundColor: $bgColor,
    height: '100%',
    margin: 0,
    padding: 0,
  };
}
