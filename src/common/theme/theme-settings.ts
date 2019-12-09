import { RefStypRule, StypColor, StypLength, StypLengthPt, StypProperties, StypRGB } from 'style-producer';

export interface ThemeSettings {
  $color: StypColor;
  $bgColor: StypColor;
  $fontFace: string;
  $fontSize: StypLengthPt;
  $lineHeight: number;
  $fontWeight: string;
  $linkFontWeight: string;
  $layoutBreakpoint: StypLength;
}

export const ThemeSettings: RefStypRule<ThemeSettings> = RefStypRule.by(
    { $: 'settings' },
    {
      $color: new StypRGB({ r: 161, g: 185, b: 142 }),
      $bgColor: new StypRGB({ r: 40, g: 43, b: 36 }),
      $fontFace: `'Exo 2', sans-serif`,
      $fontSize: StypLengthPt.of(1, 'em'),
      $lineHeight: 1.2,
      $fontWeight: '400',
      $linkFontWeight: '600',
      $layoutBreakpoint: StypLength.of(576, 'px'),
    });

export function mediaStyle({ $layoutBreakpoint }: ThemeSettings): StypProperties {
  return {
    '@media:sm': `(max-width: ${$layoutBreakpoint})`,
  };
}
