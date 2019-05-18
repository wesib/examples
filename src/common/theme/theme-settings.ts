import { Theme } from './theme';
import { StypLength, StypMapper, StypSelector } from 'style-producer';
import { ContextRequest, ContextTarget, SingleContextKey } from 'context-values';
import { AfterEvent, afterEventFrom } from 'fun-events';

export interface ThemeSettings {
  $lBorderW: StypLength;
  $vBorderPlace: StypLength;
  $hBorderPlace: StypLength;
}

const ThemeSettings__selector: StypSelector = { $: 'settings' };

const buildThemeSettings = StypMapper.by<ThemeSettings>({
  $lBorderW: StypLength.of(6, 'px'),
  $vBorderPlace: StypLength.of(2, 'px'),
  $hBorderPlace: StypLength.of(4, 'px'),
});

export const ThemeSettings: ContextTarget<AfterEvent<[ThemeSettings]>> & ContextRequest<AfterEvent<[ThemeSettings]>> =
    /*#__PURE__*/ new SingleContextKey(
    'theme-settings',
    context => afterEventFrom(
        context.get(Theme)
            .watch(ThemeSettings__selector)
            .thru(buildThemeSettings))
);
