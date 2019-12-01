import { Theme } from '@wesib/generic';
import { StypProperties, stypRules, StypRules } from 'style-producer';
import { LinkStyle } from './link.style';
import { ThemeSettings } from './theme-settings';

export function DefaultStyle(theme: Theme): StypRules {

  const settings = theme.ref(ThemeSettings).read.keep;

  theme.root.add(settings.thru(defaultStyle));

  return stypRules(
      theme.root.rules.self,
      theme.style(LinkStyle),
  );
}

function defaultStyle(
    {
      $color,
      $fontFace,
      $fontSize,
      $lineHeight,
      $fontWeight,
    }: ThemeSettings,
): StypProperties {
  return {
    color: $color,
    font: `normal ${$fontWeight} ${$fontSize}/${$lineHeight} ${$fontFace}`,
  };
}
