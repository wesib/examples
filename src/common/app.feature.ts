import { Feature } from '@wesib/wesib';
import { InputSupport } from './input/input-support.feature';
import { LayoutSupportFeature } from './layout';
import { BodyStyleSupport } from './theme/body-style-support.feature';

@Feature({
  needs: [
    BodyStyleSupport,
    InputSupport,
    LayoutSupportFeature,
  ],
})
export class AppFeature {}
