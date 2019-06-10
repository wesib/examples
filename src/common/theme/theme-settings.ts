import { RefStypRule, StypColor, StypLength, StypRGB } from 'style-producer';

export interface ThemeSettings {
  $color: StypColor;
  $bgColor: StypColor;
  $lBorderW: StypLength;
  $vBorderPlace: StypLength;
  $hBorderPlace: StypLength;
}

export const ThemeSettings: RefStypRule<ThemeSettings> = RefStypRule.by(
    { $: 'settings' },
    {
      $color: new StypRGB({ r: 192, g: 192, b: 192 }),
      $bgColor: new StypRGB({ r: 0, g: 0, b: 0 }),
      $lBorderW: StypLength.of(6, 'px'),
      $vBorderPlace: StypLength.of(2, 'px'),
      $hBorderPlace: StypLength.of(4, 'px'),
    });
