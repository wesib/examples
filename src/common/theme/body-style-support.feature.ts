import { produceBasicStyle, stypDomFormat } from '@proc7ts/style-producer';
import { ComponentStypDomFormat, ComponentStypFormat, Theme } from '@wesib/generic/styp';
import { Feature } from '@wesib/wesib';
import { BodyStyle } from './body.style';

@Feature({
  setup(setup) {
    setup.perComponent({ a: ComponentStypFormat, as: ComponentStypDomFormat });
  },
  init(context) {
    context.whenReady(() => {
      produceBasicStyle(context.get(Theme).style(BodyStyle), stypDomFormat());
    });
  },
})
export class BodyStyleSupport {}

