import { Feature } from '@wesib/wesib';
import { BodyStyleSupport } from './theme/body-style-support.feature';

@Feature({ needs: BodyStyleSupport })
export class AppFeature {
}
