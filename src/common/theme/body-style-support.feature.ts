import { Theme, ThemeSupport } from '@wesib/generic/styp';
import { Feature } from '@wesib/wesib';
import { produceBasicStyle } from 'style-producer';
import { BodyStyle } from './body.style';

@Feature({
  needs: ThemeSupport,
  init(context) {
    context.whenReady(() => {
      produceBasicStyle(context.get(Theme).style(BodyStyle));
    });
  },
})
export class BodyStyleSupport {}

