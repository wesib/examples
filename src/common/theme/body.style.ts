import { Theme } from '@wesib/generic';
import { StypProperties, stypRules, StypRules } from 'style-producer';
import { DefaultStyle } from './default.style';
import { ThemeSettings } from './theme-settings';

export function BodyStyle(theme: Theme): StypRules {

  const settings = theme.ref(ThemeSettings).read.keep;
  const { root: { rules } } = theme;

  return stypRules(
      rules.add(
          { e: 'html' },
          {
            height: '100%',
            margin: 0,
            padding: 0,
          },
      ),
      rules.add(
          { e: 'body' },
          settings.thru(bodyStyle),
      ),
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
