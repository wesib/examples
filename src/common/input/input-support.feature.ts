import { ComponentTreeSupport, ThemeSupport } from '@wesib/generic';
import { Feature } from '@wesib/wesib';
import { InErrorComponent } from './in-error.component';

@Feature({
  needs: [
    ComponentTreeSupport,
    InErrorComponent,
    ThemeSupport,
  ],
})
export class InputSupport {
}
