import { Theme } from '@wesib/generic';
import { StypColor, StypLength, StypProperties, StypRules } from 'style-producer';
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
    backgroundImage: borderImage($borderColor),
    backgroundPosition: `
        left top,
        left bottom,
        right top,
        right bottom,
        left top,
        right top
      `,
    backgroundSize: borderSize($borderW, $hBorderLen),
  };
}

function inFocusStyle(
    {
      $color,
      $focusHBorderLen,
      $borderW,
      $hBorderLen,
    }: FormThemeSettings): StypProperties {
  return {
    backgroundImage: borderImage($color.hsl.set(hsl => ({ l: hsl.l * 1.25 }))),
    backgroundSize: borderSize($borderW, $hBorderLen, $focusHBorderLen),
  };
}

function borderImage(color: StypColor): string {
  return `
    linear-gradient(to right, ${color}, transparent), /* top left */
    linear-gradient(to right, ${color}, transparent), /* bottom left */
    linear-gradient(to left, ${color}, transparent), /* top right */
    linear-gradient(to left, ${color}, transparent), /* bottom right */
    linear-gradient(to bottom, ${color}, ${color}), /* left */
    linear-gradient(to bottom, ${color}, ${color}) /* right */
  `;
}

function borderSize(borderW: StypLength, hBorderLen: StypLength, tlhBorderLen = hBorderLen) {
  return `
    ${tlhBorderLen} ${borderW},
    ${hBorderLen} ${borderW},
    ${hBorderLen} ${borderW},
    ${tlhBorderLen} ${borderW},
    ${borderW} 100%,
    ${borderW} 100%
  `;
}
