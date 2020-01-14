import { ComponentTreeSupport, PageLoadSupport, StyleProducerSupport, ThemeSupport } from '@wesib/generic';
import { Feature } from '@wesib/wesib';
import { ContainerComponent } from './container.component';

@Feature({
  needs: [
    ContainerComponent,
    ComponentTreeSupport,
    PageLoadSupport,
    StyleProducerSupport,
    ThemeSupport,
  ],
})
export class LayoutSupportFeature {
}
