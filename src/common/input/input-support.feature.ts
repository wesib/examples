import { ComponentTreeSupport, ThemeSupport } from '@wesib/generic';
import { Feature } from '@wesib/wesib';
import { InElementComponent } from './in-element.component';
import { InErrorComponent } from './in-error.component';

@Feature({
  needs: [
    ComponentTreeSupport,
    InElementComponent,
    InErrorComponent,
    ThemeSupport,
  ],
})
export class InputSupport {
}
