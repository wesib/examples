import { ComponentTreeSupport } from '@wesib/generic';
import { ThemeSupport } from '@wesib/generic/styp';
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
