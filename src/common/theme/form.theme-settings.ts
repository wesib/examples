import { RefStypRule, StypColor, StypLength, StypMapper, StypRGB, StypRuleRefs } from 'style-producer';
import { ThemeSettings } from './theme-settings';

export interface FormThemeSettings {
  $color: StypColor;
  $bgColor: StypColor;
  $borderColor: StypColor;
  $padding: StypLength;
  $borderWidth: string;
  $borderW: StypLength;
  $lBorderW: StypLength;
  $hBorderLen: StypLength;
  $focusHBorderLen: StypLength;
}

export const FormThemeSettings: RefStypRule<FormThemeSettings> = RefStypRule.by(
    { $: 'settings:form' },
    root => StypRuleRefs.by<{ global: ThemeSettings }>(
        {
          global: ThemeSettings,
        },
        root,
    ).read.keep.thru(formMappings));

const inColor = new StypRGB({ r: 0, g: 0, b: 0 });

function formMappings(
    {
      global: {
        $lBorderW,
        $hBorderPlace,
        $vBorderPlace,
      }
    }: {
      global: ThemeSettings,
    }
): StypMapper.Mappings<FormThemeSettings> {
  return {
    $color: inColor,
    $bgColor: new StypRGB({ r: 255, g: 255, b: 255 }),
    $borderColor: inColor,
    $padding: StypLength.of(3, 'px'),
    $borderWidth: `${$vBorderPlace} ${$hBorderPlace} ${$vBorderPlace} ${$lBorderW}`,
    $borderW: StypLength.of(1, 'px'),
    $lBorderW: $lBorderW.add(StypLength.of(1, 'px')),
    $hBorderLen: $lBorderW.mul(1.5),
    $focusHBorderLen: $lBorderW.mul(3),
  };
}
