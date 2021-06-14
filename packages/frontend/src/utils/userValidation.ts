import { User } from '../models/user.model';

export abstract class UserValidator {
  private static emailRegExp = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
  public static validateUser(user: User) {
    const emailErrors = this.validateEmail(user.user_email);
    const passwordErrors = this.validatePassword(user.user_pass);
    user.errors.clear();
    if (emailErrors) user.errors.set('user_email', emailErrors);

    if (passwordErrors) user.errors.set('user_pass', passwordErrors);
  }

  private static validateEmail(email: string) {
    console.log(email);
    console.log(this.emailRegExp.test(email));
    let error;
    if (email == undefined || email.length == 0) error = 'Field is empty';
    else if (!this.emailRegExp.test(email)) {
      error = 'Email is invalid';
    }

    return error;
  }

  //If we want to add anything
  private static validatePassword(pass: string) {
    let error;
    if (pass == undefined || pass.length == 0) error = 'Field is empty';
    else if (pass.length < 8) error = 'Password is too short';
    return error;
  }
}
