import { FeatureDef, FeatureDef__symbol } from '@wesib/wesib';
import { Theme } from './theme';
import { StypProperties, StypSelector } from 'style-producer';
import { settingsSelector, ThemeSettingsSupport, } from './theme-settings-support.feature';
import { StyleProvider } from './style-provider';

const FormThemeSupport__feature: FeatureDef = {
  needs: ThemeSettingsSupport,
  set: [
    { a: StyleProvider, is: declareFormSettings },
    { a: StyleProvider, is: declareInputStyle }
  ],
};

export class FormThemeSupport {

  static get [FeatureDef__symbol]() {
    return FormThemeSupport__feature;
  }

}

export const formSettingsSelector: StypSelector = { $: 'settings:form' };

function declareFormSettings(theme: Theme) {
  theme.root.rules.add(
      formSettingsSelector,
      theme.watch(settingsSelector).thru((settings: StypProperties) => {

        const {
          $lBorderW,
          $vBorderPlace,
          $hBorderPlace,
        } = settings;
        const $inColor = 'black';

        return {
          ...settings,
          $inColor,
          $inBgColor: 'white',
          $inBorderColor: $inColor,
          $inPadding: 3,
          $inBorderWidth: `${$vBorderPlace}px ${$hBorderPlace}px ${$vBorderPlace}px ${$lBorderW}px`,
          $inBorderW: 1,
          $inLBorderW: Number($lBorderW) + 1,
          $inHBorderLen: Math.floor(Number($lBorderW) * 1.5),
          $inFocusHBorderLen: Math.floor(Number($lBorderW) * 3),
        };
      }));
}

function declareInputStyle(theme: Theme) {
  theme.root.rules.add(
      { e: 'input' },
      theme.watch(formSettingsSelector).thru((settings: StypProperties) => {

        const {
          $inColor,
          $inPadding,
          $inBgColor,
          $inBorderWidth,
          $inBorderColor,
          $inBorderW,
          $inHBorderLen,
        } = settings;

        return {
          color: $inColor,
          padding: `${$inPadding}px`,
          backgroundColor: $inBgColor,
          outline: 'none',
          border: 'solid transparent',
          borderWidth: `${$inBorderWidth}px`,
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
            ${$inHBorderLen}px ${$inBorderW}px,
            ${$inHBorderLen}px ${$inBorderW}px,
            ${$inHBorderLen}px ${$inBorderW}px,
            ${$inHBorderLen}px ${$inBorderW}px,
            ${$inBorderW}px 100%,
            ${$inBorderW}px 100%
          `,
        };
      }));
  theme.root.rules.add(
      { e: 'input', s: ':focus' },
      theme.watch(formSettingsSelector).thru((settings: StypProperties) => {

        const {
          $inFocusHBorderLen,
          $inBorderW,
          $inHBorderLen,
        } = settings;

        return {
          backgroundSize: `
            ${$inFocusHBorderLen}px ${$inBorderW}px,
            ${$inHBorderLen}px ${$inBorderW}px,
            ${$inHBorderLen}px ${$inBorderW}px,
            ${$inFocusHBorderLen}px ${$inBorderW}px,
            ${$inBorderW}px 100%,
            ${$inBorderW}px 100%
          `,
        };
      }));
}
