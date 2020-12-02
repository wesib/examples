import { RefStypRule, StypColor, StypLength, StypLengthPt, StypMapper, StypRuleRefs } from '@frontmeans/style-producer';
import { ThemeSettings } from '../theme';

export interface FormThemeSettings {
  $color: StypColor;
  $bgColor: StypColor;
  $roBgColor: StypColor;
  $fontFace: string;
  $fontSize: StypLengthPt;
  $errorFontSize: StypLengthPt;
  $lineHeight: number;
  $fontWeight: string;
  $borderColor: StypColor;
  $marginV: StypLengthPt;
  $marginH: StypLengthPt;
  $paddingV: StypLengthPt;
  $paddingH: StypLengthPt;
  $borderW: StypLength;
}

export const FormThemeSettings: RefStypRule<FormThemeSettings> = RefStypRule.by(
    { $: 'settings:form' },
    root => StypRuleRefs.by<{ global: ThemeSettings }>(
        {
          global: ThemeSettings,
        },
        root,
    ).read().keepThru(formMappings),
);

function formMappings(
    {
      global: {
        $color,
        $bgColor,
        $fontFace,
        $fontSize,
        $lineHeight,
        $fontWeight,
      },
    }: {
      global: ThemeSettings;
    },
): StypMapper.Mappings<FormThemeSettings> {
  return {
    $color,
    $bgColor: $bgColor.hsl.set(({ l }) => ({ l: l * 0.8 })),
    $roBgColor: $bgColor.hsl.set(({ l }) => ({ l: l * 0.94 })),
    $fontFace,
    $fontSize,
    $errorFontSize: $fontSize.mul(0.8),
    $lineHeight,
    $fontWeight,
    $borderColor: $bgColor,
    $marginV: $fontSize.div(4),
    $marginH: $fontSize.div(4),
    $paddingV: $fontSize.div(2),
    $paddingH: $fontSize,
    $borderW: StypLength.of(1, 'px'),
  };
}
