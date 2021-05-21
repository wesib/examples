import { StyleProducerSupport } from '@wesib/css';
import { PageLoadSupport } from '@wesib/navigation';
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
