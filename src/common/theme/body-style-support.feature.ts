import { Theme, ThemeSupport } from '@wesib/generic';
import { BootstrapContext, Feature } from '@wesib/wesib';
import { produceBasicStyle } from 'style-producer';
import { BodyStyle } from './body.style';

@Feature({
  needs: ThemeSupport,
  init: addBodyStyle,
})
export class BodyStyleSupport {}

function addBodyStyle(context: BootstrapContext) {
  context.whenReady(() => {
    produceBasicStyle(context.get(Theme).style(BodyStyle));
  });
}
