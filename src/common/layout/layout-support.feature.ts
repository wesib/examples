import { ComponentTreeSupport, PageLoadSupport, ThemeSupport } from '@wesib/generic';
import { Feature } from '@wesib/wesib';
import { NavBodyComponent } from './nav-body.component';
import { ContainerComponent } from './container.component';
import { NavComponent } from './nav.component';

@Feature({
  needs: [
    NavBodyComponent,
    ContainerComponent,
    NavComponent,
    ComponentTreeSupport,
    PageLoadSupport,
    ThemeSupport,
  ],
})
export class LayoutSupportFeature {
}
