import { StypLength, StypMapper, StypProperties, StypSelector } from 'style-producer';
import { Theme } from './theme';
import { ContextRequest, ContextTarget, SingleContextKey } from 'context-values';
import { AfterEvent, afterEventFrom, afterEventFromAll } from 'fun-events';
import { ThemeSettings } from './theme-settings';

export interface FormThemeSettings {
  $inColor: string;
  $inBgColor: string;
  $inBorderColor: string;
  $inPadding: StypLength;
  $inBorderWidth: string;
  $inBorderW: StypLength;
  $inLBorderW: StypLength;
  $inHBorderLen: StypLength;
  $inFocusHBorderLen: StypLength;
}

const FormThemeSettings__selector: StypSelector = { $: 'settings:form' };

const $inColor = 'black';
export const FormThemeSettings:
    ContextTarget<AfterEvent<[FormThemeSettings]>> & ContextRequest<AfterEvent<[FormThemeSettings]>> =
    /*#__PURE__*/ new SingleContextKey(
    'form-theme-settings',
    context => afterEventFrom<[FormThemeSettings]>(
        afterEventFromAll({
          global: context.get(ThemeSettings),
          form: context.get(Theme).watch(FormThemeSettings__selector),
        }).thru(buildFormThemeSettings)
    ));

function buildFormThemeSettings(
    {
      global: [{
        $lBorderW,
        $hBorderPlace,
        $vBorderPlace,
      }],
      form: [form]
    }: { global: [ThemeSettings], form: [StypProperties] }): FormThemeSettings {
  return StypMapper.map<FormThemeSettings>(
      {
        $inColor,
        $inBgColor: 'white',
        $inBorderColor: $inColor,
        $inPadding: StypLength.of(3, 'px'),
        $inBorderWidth: `${$vBorderPlace} ${$hBorderPlace} ${$vBorderPlace} ${$lBorderW}`,
        $inBorderW: StypLength.of(1, 'px'),
        $inLBorderW: $lBorderW.add(StypLength.of(1, 'px')),
        $inHBorderLen: $lBorderW.mul(1.5),
        $inFocusHBorderLen: $lBorderW.mul(3),
      },
      form);
}
