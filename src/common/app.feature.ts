import { Feature } from '@wesib/wesib';
import { LayoutSupportFeature } from './layout';
import { BodyStyleSupport } from './theme/body-style-support.feature';

@Feature({
  needs: [
    BodyStyleSupport,
    LayoutSupportFeature,
  ],
})
export class AppFeature {}
