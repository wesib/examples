import { produceBasicStyle, stypDomFormat } from '@frontmeans/style-producer';
import { cxBuildAsset } from '@proc7ts/context-builder';
import { ComponentStypDomFormat, ComponentStypFormat, Theme } from '@wesib/css';
import { ComponentContext, Feature } from '@wesib/wesib';
import { BodyStyle } from './body.style';

@Feature({
  setup(setup) {
    setup.perComponent(cxBuildAsset(
        ComponentStypFormat,
        target => new ComponentStypDomFormat(target.get(ComponentContext)),
    ));
  },
  init(context) {
    context.whenReady(() => {
      produceBasicStyle(context.get(Theme).style(BodyStyle), stypDomFormat());
    });
  },
})
export class BodyStyleSupport {}
