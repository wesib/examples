import { ComponentTreeSupport, PageLoadSupport, ThemeSupport } from '@wesib/generic';
import { Feature } from '@wesib/wesib';
import { ContainerComponent } from './container.component';

@Feature({
  needs: [
    ContainerComponent,
    ComponentTreeSupport,
    PageLoadSupport,
    ThemeSupport,
  ],
})
export class LayoutSupportFeature {
}
