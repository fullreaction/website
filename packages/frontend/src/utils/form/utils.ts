import { AbstractControl } from './model';

export const getFormClasses = (control: AbstractControl) => ({
  'fr-pristine': control.pristine,
  'fr-dirty': control.dirty,

  'fr-valid': control.valid,
  'fr-invalid': control.invalid,

  'fr-touched': control.touched,
  'fr-untouched': control.untouched,
});
