import { ComponentInContext } from '@wesib/generic';
import { ContextKey, ContextKey__symbol, SingleContextKey } from 'context-values';
import { AfterEvent, EventSupply, trackValue } from 'fun-events';
import { InValidation, inValidationResult } from 'input-aspects';

const ValidationResult__key = /*#__PURE__*/ new SingleContextKey<ValidationResult>('error-receiver');

export class ValidationResult {

  static get [ContextKey__symbol](): ContextKey<ValidationResult> {
    return ValidationResult__key;
  }

  private readonly _result = trackValue<InValidation.Result>(inValidationResult());
  readonly read: AfterEvent<[InValidation.Result]> = this._result.read;

  enable({ control }: ComponentInContext): EventSupply {
    return control.aspect(InValidation)
        .read(result => this._result.it = result)
        .whenOff(() => this._result.it = inValidationResult());
  }

}
