import { ComponentTreeSupport, PageLoadSupport, StyleProducerSupport, ThemeSupport } from '@wesib/generic';
import { Feature, RenderSupport } from '@wesib/wesib';
import { ContainerComponent } from './container.component';

@Feature({
  needs: [
    ContainerComponent,
    ComponentTreeSupport,
    PageLoadSupport,
    RenderSupport,
    StyleProducerSupport,
    ThemeSupport,
  ],
})
export class LayoutSupportFeature {
}
