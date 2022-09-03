import { FormCssPreset, FormModePreset } from '@wesib/forms';
import { Feature } from '@wesib/wesib';
import { FieldErrorComponent } from './field-error.component';

@Feature({
  needs: [FormModePreset, FormCssPreset, FieldErrorComponent],
})
export class FormsSupport {}
