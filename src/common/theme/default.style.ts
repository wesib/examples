import { StypProperties, stypRules, StypRules } from '@proc7ts/style-producer';
import { Theme } from '@wesib/generic/styp';
import { LinkStyle } from './link.style';
import { mediaStyle, ThemeSettings } from './theme-settings';

export function DefaultStyle(theme: Theme): StypRules {

  const settings = theme.ref(ThemeSettings).read();

  return stypRules(
      theme.root
          .add(settings.keepThru(defaultStyle))
          .add(settings.keepThru(mediaStyle)),
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
