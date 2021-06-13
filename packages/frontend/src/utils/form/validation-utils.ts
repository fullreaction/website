import { AbstractControl, ValidationErrors } from './model';

/*
export const validate = async (control: AbstractControl<any>): Promise<ValidationErrors | null> => {
  const valid = control._validato.map(validator => validator(control));
  const errorList = await Promise.all();
  return mergeErrors(errorList);
};
*/

export const mergeErrors = (validationErrors: ValidationErrors[] | null): ValidationErrors | null => {
  if (!validationErrors) return null;
  const errors = Object.assign({}, ...validationErrors);
  return Object.keys(errors).length === 0 ? null : errors;
};

type GenericValidatorFn = (control: AbstractControl) => any;

export function executeValidators<V extends GenericValidatorFn>(control: AbstractControl, validators: V[]): ReturnType<V>[] {
  return validators.map(validator => validator(control));
}

export function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}

export function hasValidLength(value: any): boolean {
  // non-strict comparison is intentional, to check for both `null` and `undefined` values
  return value != null && typeof value.length === 'number';
}

export const EMAIL_REGEXP =
  /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
