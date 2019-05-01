import { FeatureDef, FeatureDef__symbol } from '@wesib/wesib';
import { ThemeSupport } from './theme-support.feature';
import { Theme } from './theme';
import { StypSelector } from 'style-producer';
import { StyleProvider } from './style-provider';

const ThemeSettingsSupport__feature: FeatureDef = {
  needs: ThemeSupport,
  set: { a: StyleProvider, is: declareSettings },
};

export class ThemeSettingsSupport {

  static get [FeatureDef__symbol]() {
    return ThemeSettingsSupport__feature;
  }

}

export const settingsSelector: StypSelector = { $: 'settings' };

function declareSettings(theme: Theme) {
  theme.rules.add(
      settingsSelector,
      {
        $lBorderW: 6,
        $vBorderPlace: 2,
        $hBorderPlace: 4,
      });
}
