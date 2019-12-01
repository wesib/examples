import { Theme } from '@wesib/generic';
import { mixStypColors, StypProperties, StypRules } from 'style-producer';
import { FormThemeSettings } from './form.theme-settings';

export function InputStyle(theme: Theme): StypRules {

  const formSettings = theme.ref(FormThemeSettings).read.keep;
  const { root: { rules } } = theme;

  rules.add({ e: 'input' }, formSettings.thru(inStyle));
  rules.add({ e: 'input', s: '[readonly]' }, formSettings.thru(roInStyle));
  rules.add({ e: 'input', s: '[disabled]' }, formSettings.thru(roInStyle));
  rules.add({ e: 'input', s: ':focus' }, formSettings.thru(inFocusStyle));
  rules.add({ e: 'input', c: ['inap-invalid', 'inap-touched'] }, formSettings.thru(inInvalidStyle));
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

export function roInStyle(
    {
      $roBgColor,
    }: FormThemeSettings,
): StypProperties {
  return {
    backgroundColor: $roBgColor
  };
}

function inFocusStyle(
    {
      $color,
      $borderColor,
    }: FormThemeSettings,
): StypProperties {
  return {
    outlineColor: mixStypColors($borderColor, $color, 0.5),
  };
}

function inInvalidStyle(
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
