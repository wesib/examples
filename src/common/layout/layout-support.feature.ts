import { Feature } from '@wesib/wesib';
import { BexContainerComponent } from './bex-container.component';

@Feature({
  needs: BexContainerComponent,
})
export class LayoutSupportFeature {
}
