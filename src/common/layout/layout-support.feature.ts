import { ComponentTreeSupport, PageLoadSupport } from '@wesib/generic';
import { StyleProducerSupport, ThemeSupport } from '@wesib/generic/styp';
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
