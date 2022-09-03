import { InputAspects__NS } from '@frontmeans/input-aspects';
import { mixStypColors, StypProperties, stypRules, StypRules } from '@frontmeans/style-producer';
import { mapAfter } from '@proc7ts/fun-events';
import { Theme } from '@wesib/css';
import { FormThemeSettings } from './form.theme-settings';

export function FormStyle(theme: Theme): StypRules {
  const formSettings = theme.ref(FormThemeSettings).read;
  const {
    root: { rules },
  } = theme;

  return stypRules(
    rules.add({ e: 'input' }, formSettings.do(mapAfter(inStyle))),
    rules.add({ e: 'input', s: '[readonly]' }, formSettings.do(mapAfter(readonlyInStyle))),
    rules.add({ e: 'input', s: '[disabled]' }, formSettings.do(mapAfter(readonlyInStyle))),
    rules.add({ e: 'input', s: ':focus' }, formSettings.do(mapAfter(focusedInStyle))),
    rules.add(
      {
        e: 'input',
        c: [
          ['invalid', InputAspects__NS],
          ['touched', InputAspects__NS],
        ],
      },
      formSettings.do(mapAfter(invalidInStyle)),
    ),
    rules.add(
      {
        e: 'input',
        c: [
          ['missing', InputAspects__NS],
          ['touched', InputAspects__NS],
        ],
      },
      {
        outlineStyle: 'dotted',
      },
    ),
    rules.add(
      {
        e: 'input',
        c: [
          ['incomplete', InputAspects__NS],
          ['touched', InputAspects__NS],
        ],
      },
      {
        outlineStyle: 'dotted',
      },
    ),
  );
}

export function inStyle({
  $color,
  $fontFace,
  $fontSize,
  $lineHeight,
  $fontWeight,
  $marginV,
  $marginH,
  $paddingV,
  $paddingH,
  $bgColor,
  $borderColor,
  $borderW,
}: FormThemeSettings): StypProperties {
  return {
    color: $color,
    font: `normal ${$fontWeight} ${$fontSize}/${$lineHeight} ${$fontFace}`,
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

export function readonlyInStyle({ $roBgColor }: FormThemeSettings): StypProperties {
  return {
    backgroundColor: $roBgColor,
  };
}

function focusedInStyle({ $color, $borderColor }: FormThemeSettings): StypProperties {
  return {
    outlineColor: mixStypColors($borderColor, $color, 0.5),
  };
}

function invalidInStyle({ $color, $borderW, $borderColor }: FormThemeSettings): StypProperties {
  return {
    outline: `${$borderW.mul(2)} dashed ${mixStypColors($borderColor, $color, 0.25)}`,
  };
}
