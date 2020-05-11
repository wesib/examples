import { PageLoadSupport } from '@wesib/generic';
import { StyleProducerSupport } from '@wesib/generic/styp';
import { Feature } from '@wesib/wesib';
import { ContainerComponent } from './container.component';

@Feature({
  needs: [
    ContainerComponent,
    PageLoadSupport,
    StyleProducerSupport,
  ],
})
export class LayoutSupportFeature {
}
