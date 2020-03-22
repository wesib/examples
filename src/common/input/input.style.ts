import { InputAspects__NS } from '@proc7ts/input-aspects';
import { mixStypColors, StypProperties, stypRules, StypRules } from '@proc7ts/style-producer';
import { Theme } from '@wesib/generic/styp';
import { FormThemeSettings } from './form.theme-settings';

export function InputStyle(theme: Theme): StypRules {

  const formSettings = theme.ref(FormThemeSettings).read();
  const { root: { rules } } = theme;

  return stypRules(
      rules.add({ e: 'input' }, formSettings.thru(inStyle)),
      rules.add({ e: 'input', s: '[readonly]' }, formSettings.thru(readonlyInStyle)),
      rules.add({ e: 'input', s: '[disabled]' }, formSettings.thru(readonlyInStyle)),
      rules.add({ e: 'input', s: ':focus' }, formSettings.thru(focusedInStyle)),
      rules.add(
          {
            e: 'input',
            c: [
              ['invalid', InputAspects__NS],
              ['touched', InputAspects__NS],
            ],
          },
          formSettings.keepThru(invalidInStyle),
      ),
      rules.add(
          {
            e: 'input',
            c: [
              ['missing', InputAspects__NS],
              ['touched', InputAspects__NS],
            ],
          },
          {
            outlineStyle: 'dotted',
          },
      ),
      rules.add(
          {
            e: 'input',
            c: [
              ['incomplete', InputAspects__NS],
              ['touched', InputAspects__NS],
            ],
          },
          {
            outlineStyle: 'dotted',
          },
      ),
  );
}

export function inStyle(
    {
      $color,
      $fontFace,
      $fontSize,
      $lineHeight,
      $fontWeight,
      $marginV,
      $marginH,
      $paddingV,
      $paddingH,
      $bgColor,
      $borderColor,
      $borderW,
    }: FormThemeSettings,
): StypProperties {
  return {
    color: $color,
    font: `normal ${$fontWeight} ${$fontSize}/${$lineHeight} ${$fontFace}`,
    padding: `${$paddingV} ${$paddingH}`,
    margin: `${$marginV} ${$marginH}`,
    backgroundColor: $bgColor,
    border: '0 none',
    outline: `${$borderW} solid ${$borderColor}`,
    boxShadow: 'inset 1px 1px 2px -2px black',
    boxSizing: 'border-box',
    width: '100%',
  };
}

export function readonlyInStyle(
    {
      $roBgColor,
    }: FormThemeSettings,
): StypProperties {
  return {
    backgroundColor: $roBgColor,
  };
}

function focusedInStyle(
    {
      $color,
      $borderColor,
    }: FormThemeSettings,
): StypProperties {
  return {
    outlineColor: mixStypColors($borderColor, $color, 0.5),
  };
}

function invalidInStyle(
    {
      $color,
      $borderW,
      $borderColor,
    }: FormThemeSettings,
): StypProperties {
  return {
    outline: `${$borderW.mul(2)} dashed ${mixStypColors($borderColor, $color, 0.25)}`,
  };
}
