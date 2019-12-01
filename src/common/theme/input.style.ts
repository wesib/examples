import { Theme } from '@wesib/generic';
import { mixStypColors, StypProperties, StypRules } from 'style-producer';
import { FormThemeSettings } from './form.theme-settings';

export function InputStyle(theme: Theme): StypRules {

  const formSettings = theme.ref(FormThemeSettings).read.keep;
  const { root: { rules } } = theme;

  rules.add({ e: 'input' }, formSettings.thru(inStyle));
  rules.add({ e: 'input', s: '[readonly]' }, formSettings.thru(readonlyInStyle));
  rules.add({ e: 'input', s: '[disabled]' }, formSettings.thru(readonlyInStyle));
  rules.add({ e: 'input', s: ':focus' }, formSettings.thru(focusedInStyle));
  rules.add({ e: 'input', c: ['inap-invalid', 'inap-touched'] }, formSettings.thru(invalidInStyle));
  rules.add({ e: 'input', c: ['inap-missing', 'inap-touched'] }, { outlineStyle: 'dotted' });
  rules.add({ e: 'input', c: ['inap-incomplete', 'inap-touched'] }, { outlineStyle: 'dotted' });

  return rules.grab({ e: 'input' });
}

export function inStyle(
    {
      $color,
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
    backgroundColor: $roBgColor
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
