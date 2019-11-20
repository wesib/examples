import { ComponentTreeSupport, PageLoadSupport, ThemeSupport } from '@wesib/generic';
import { Feature, RenderSupport } from '@wesib/wesib';
import { BexBodyComponent } from './bex-body.component';
import { BexContainerComponent } from './bex-container.component';
import { BexNavComponent } from './bex-nav.component';

@Feature({
  needs: [
    BexBodyComponent,
    BexContainerComponent,
    BexNavComponent,
    ComponentTreeSupport,
    PageLoadSupport,
    RenderSupport,
    ThemeSupport,
  ],
})
export class LayoutSupportFeature {
}
