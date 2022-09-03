import { StypProperties, stypRules, StypRules } from '@frontmeans/style-producer';
import { mapAfter } from '@proc7ts/fun-events';
import { Theme } from '@wesib/css';
import { LinkStyle } from './link.style';
import { mediaStyle, ThemeSettings } from './theme-settings';

export function DefaultStyle(theme: Theme): StypRules {
  const settings = theme.ref(ThemeSettings).read;

  return stypRules(
    theme.root.add(settings.do(mapAfter(defaultStyle))).add(settings.do(mapAfter(mediaStyle))),
    theme.style(LinkStyle),
  );
}

function defaultStyle({
  $color,
  $fontFace,
  $fontSize,
  $lineHeight,
  $fontWeight,
}: ThemeSettings): StypProperties {
  return {
    color: $color,
    font: `normal ${$fontWeight} ${$fontSize}/${$lineHeight} ${$fontFace}`,
  };
}
