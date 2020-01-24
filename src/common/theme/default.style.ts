import { Theme } from '@wesib/generic/styp';
import { StypProperties, stypRules, StypRules } from 'style-producer';
import { LinkStyle } from './link.style';
import { mediaStyle, ThemeSettings } from './theme-settings';

export function DefaultStyle(theme: Theme): StypRules {

  const settings = theme.ref(ThemeSettings).read.keep;

  return stypRules(
      theme.root
          .add(settings.thru(defaultStyle))
          .add(settings.thru(mediaStyle)),
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
