import { Theme } from '@wesib/generic';
import { StypProperties, StypRules } from 'style-producer';
import { FormThemeSettings } from './form.theme-settings';

export function InputStyle(theme: Theme): StypRules {

    const formSettings = theme.ref(FormThemeSettings).read.keep;

    theme.root.rules.add(
        { e: 'input' },
        formSettings.thru(inStyle));
    theme.root.rules.add(
        { e: 'input', s: ':focus' },
        formSettings.thru(inFocusStyle));

    return theme.root.rules.grab({ e: 'input' });
}

function inStyle(
    {
      $color,
      $padding,
      $bgColor,
      $borderWidth,
      $borderColor,
      $borderW,
      $hBorderLen,
    }: FormThemeSettings): StypProperties {
  return {
    color: $color,
    padding: $padding,
    backgroundColor: $bgColor,
    outline: 'none',
    border: 'solid transparent',
    borderWidth: $borderWidth,
    backgroundOrigin: 'border-box',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `
       linear-gradient(to right, ${$borderColor}, transparent), /* top left */
       linear-gradient(to right, ${$borderColor}, transparent), /* bottom left */
       linear-gradient(to left, ${$borderColor}, transparent), /* top right */
       linear-gradient(to left, ${$borderColor}, transparent), /* bottom right */
       linear-gradient(to bottom, ${$borderColor}, ${$borderColor}), /* left */
       linear-gradient(to bottom, ${$borderColor}, ${$borderColor}) /* right */
     `,
    backgroundPosition: `
        left top,
        left bottom,
        right top,
        right bottom,
        left top,
        right top
      `,
    backgroundSize: `
        ${$hBorderLen} ${$borderW},
        ${$hBorderLen} ${$borderW},
        ${$hBorderLen} ${$borderW},
        ${$hBorderLen} ${$borderW},
        ${$borderW} 100%,
        ${$borderW} 100%
      `,
  };
}

function inFocusStyle(
    {
      $focusHBorderLen,
      $borderW,
      $hBorderLen,
    }: FormThemeSettings): StypProperties {

  return {
    backgroundSize: `
        ${$focusHBorderLen} ${$borderW},
        ${$hBorderLen} ${$borderW},
        ${$hBorderLen} ${$borderW},
        ${$focusHBorderLen} ${$borderW},
        ${$borderW} 100%,
        ${$borderW} 100%
      `,
  };
}
