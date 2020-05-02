import { produceBasicStyle, stypDomFormat } from '@proc7ts/style-producer';
import { ComponentStypDomFormat, ComponentStypFormat, Theme, ThemeSupport } from '@wesib/generic/styp';
import { ComponentContext, Feature } from '@wesib/wesib';
import { BodyStyle } from './body.style';

@Feature({
  needs: ThemeSupport,
  setup(setup) {
    setup.perComponent({
      a: ComponentStypFormat,
      by(context: ComponentContext) {
        return new ComponentStypDomFormat(context, { offline: false });
      },
    });
  },
  init(context) {
    context.whenReady(() => {
      produceBasicStyle(context.get(Theme).style(BodyStyle), stypDomFormat());
    });
  },
})
export class BodyStyleSupport {}

