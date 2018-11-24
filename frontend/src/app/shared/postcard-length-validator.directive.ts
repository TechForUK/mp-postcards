import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn, NG_VALIDATORS } from '@angular/forms';

export const postcardLengthValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const message = control.get('message');
  const name = control.get('name');
  const address = control.get('address');

  const length: number = (message && message.value ? message.value.length : 0) +
    (name && name.value ? name.value.length : 0) +
    (address && address.value ? address.value.length : 0);

  return length > 450 ? { 'postcardLength': true } : null;
};

@Directive({
  selector: '[appPostcardLengthValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PostcardLengthValidatorDirective, multi: true }]
})
export class PostcardLengthValidatorDirective {

  validate(control: AbstractControl): ValidationErrors {
    return postcardLengthValidator(control)
  }

}
