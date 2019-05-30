import { RefStypRule, StypLength, StypRuleRefs } from 'style-producer';
import { ThemeSettings } from './theme-settings';
import { StypMapper } from 'style-producer/d.ts/value/mapper';

export interface FormThemeSettings {
  $inColor: string;
  $inBgColor: string;
  $inBorderColor: string;
  $inPadding: StypLength;
  $inBorderWidth: string;
  $inBorderW: StypLength;
  $inLBorderW: StypLength;
  $inHBorderLen: StypLength;
  $inFocusHBorderLen: StypLength;
}

const $inColor = 'black';
export const FormThemeSettings: RefStypRule<FormThemeSettings> = RefStypRule.by(
    { $: 'settings:form' },
    root => StypRuleRefs.by<{ global: ThemeSettings }>(
        {
          global: ThemeSettings,
        },
        root,
    ).read.keep.thru(formMappings));

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
    $inColor,
    $inBgColor: 'white',
    $inBorderColor: $inColor,
    $inPadding: StypLength.of(3, 'px'),
    $inBorderWidth: `${$vBorderPlace} ${$hBorderPlace} ${$vBorderPlace} ${$lBorderW}`,
    $inBorderW: StypLength.of(1, 'px'),
    $inLBorderW: $lBorderW.add(StypLength.of(1, 'px')),
    $inHBorderLen: $lBorderW.mul(1.5),
    $inFocusHBorderLen: $lBorderW.mul(3),
  };
}
