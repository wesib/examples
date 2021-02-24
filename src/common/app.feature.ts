import { Feature } from '@wesib/wesib';
import { FormsSupport } from './forms/forms-support.feature';
import { LayoutSupportFeature } from './layout';
import { BodyStyleSupport } from './theme/body-style-support.feature';

@Feature({
  needs: [
    BodyStyleSupport,
    FormsSupport,
    LayoutSupportFeature,
  ],
})
export class AppFeature {}
