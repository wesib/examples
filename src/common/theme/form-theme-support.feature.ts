import { Theme, ThemeStyle, ThemeSupport } from '@wesib/generic';
import { FeatureDef, FeatureDef__symbol } from '@wesib/wesib';
import { StypProperties, StypRules } from 'style-producer';
import { FormThemeSettings } from './form-theme-settings';

const FormThemeSupport__feature: FeatureDef = {
  needs: ThemeSupport,
  set: [
    { a: ThemeStyle, is: InputStyle }
  ],
};

export class FormThemeSupport {

  static get [FeatureDef__symbol]() {
    return FormThemeSupport__feature;
  }

}

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
      $inColor,
      $inPadding,
      $inBgColor,
      $inBorderWidth,
      $inBorderColor,
      $inBorderW,
      $inHBorderLen,
    }: FormThemeSettings): StypProperties {
  return {
    color: $inColor,
    padding: $inPadding,
    backgroundColor: $inBgColor,
    outline: 'none',
    border: 'solid transparent',
    borderWidth: $inBorderWidth,
    backgroundOrigin: 'border-box',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `
       linear-gradient(to right, ${$inBorderColor}, transparent), /* top left */
       linear-gradient(to right, ${$inBorderColor}, transparent), /* bottom left */
       linear-gradient(to left, ${$inBorderColor}, transparent), /* top right */
       linear-gradient(to left, ${$inBorderColor}, transparent), /* bottom right */
       linear-gradient(to bottom, ${$inBorderColor}, ${$inBorderColor}), /* left */
       linear-gradient(to bottom, ${$inBorderColor}, ${$inBorderColor}) /* right */
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
        ${$inHBorderLen} ${$inBorderW},
        ${$inHBorderLen} ${$inBorderW},
        ${$inHBorderLen} ${$inBorderW},
        ${$inHBorderLen} ${$inBorderW},
        ${$inBorderW} 100%,
        ${$inBorderW} 100%
      `,
  };
}

function inFocusStyle(
    {
      $inFocusHBorderLen,
      $inBorderW,
      $inHBorderLen,
    }: FormThemeSettings): StypProperties {

  return {
    backgroundSize: `
        ${$inFocusHBorderLen} ${$inBorderW},
        ${$inHBorderLen} ${$inBorderW},
        ${$inHBorderLen} ${$inBorderW},
        ${$inFocusHBorderLen} ${$inBorderW},
        ${$inBorderW} 100%,
        ${$inBorderW} 100%
      `,
  };
}
