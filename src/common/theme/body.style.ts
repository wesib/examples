import { Theme } from '@wesib/generic';
import { QualifiedName } from 'namespace-aliaser';
import { StypProperties, stypRules, StypRules } from 'style-producer';
import { BEX__NS } from '../bex.ns';
import { DefaultStyle } from './default.style';
import { ThemeSettings } from './theme-settings';

export const displayBlockCssClass: QualifiedName = ['display-block', BEX__NS];

export function BodyStyle(theme: Theme): StypRules {

  const settings = theme.ref(ThemeSettings).read.keep;
  const bodySelector = { e: 'body' };
  const htmlSelector = { e: 'html' };
  const { root: { rules } } = theme;

  rules.add(bodySelector, settings.thru(bodyStyle));
  rules.add(
      htmlSelector,
      {
        height: '100%',
        margin: 0,
        padding: 0,
      },
  );
  rules.add(
      { c: displayBlockCssClass },
      {
        display: 'block !important',
      },
  );

  return stypRules(
      rules.grab(htmlSelector),
      rules.grab(bodySelector),
      rules.grab({ c: displayBlockCssClass }),
      theme.style(DefaultStyle),
  );
}

function bodyStyle(
    {
      $bgColor,
    }: ThemeSettings,
): StypProperties {
  return {
    backgroundColor: $bgColor,
    height: '100%',
    margin: 0,
    padding: 0,
  };
}
