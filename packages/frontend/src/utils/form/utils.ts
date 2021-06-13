import { AbstractControl } from './model';

export const getClasses = (classList: Record<string, boolean>, control: AbstractControl) => ({
  ...classList,

  'fr-pristine': control.pristine,
  'fr-dirty': control.pristine,

  'fr-valid': control.valid,
  'fr-invalid': control.invalid,

  'fr-touched': control.touched,
  'fr-untouched': control.untouched,
});
