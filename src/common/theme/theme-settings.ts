import { RefStypRule, StypLength } from 'style-producer';

export interface ThemeSettings {
  $lBorderW: StypLength;
  $vBorderPlace: StypLength;
  $hBorderPlace: StypLength;
}

export const ThemeSettings: RefStypRule<ThemeSettings> = RefStypRule.by(
    { $: 'settings' },
    {
      $lBorderW: StypLength.of(6, 'px'),
      $vBorderPlace: StypLength.of(2, 'px'),
      $hBorderPlace: StypLength.of(4, 'px'),
    });
