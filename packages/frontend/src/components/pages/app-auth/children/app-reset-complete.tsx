import { Component, h, Host, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { AuthEndpoints } from '../../../../services/auth-endpoints';
import { AbstractControl, control, group, minLengthValidator, requiredValidator } from '../../../../utils/form';

const submitGuard = (model: AbstractControl, cb: () => void) => e => {
  e.preventDefault();
  if (model.valid) cb();
};

interface Form {
  password: string;
  confPassword: string;
}

@Component({
  tag: 'app-reset-complete',
})
export class AppResetComplete {
  @Prop() history: RouterHistory;

  //TODO compare passwords
  private model = group<Form>({
    password: control('', { validators: [requiredValidator, minLengthValidator(8)] }),
    confPassword: control('', { validators: [requiredValidator, minLengthValidator(8)] }),
  });

  reset() {
    try {
      const token = this.history.location.query.token;
      const { password } = this.model.getRawValue();
      AuthEndpoints.reset(token, password);
    } catch (error) {
      //TODO show error
      console.log(error);
    }
  }
  render = () => {
    const { password, confPassword } = this.model.controls;

    return (
      <Host class="Form">
        <form class="Form" onSubmit={submitGuard(this.model, () => this.reset())}>
          <h2 class="Heading-2">Reset password</h2>
          <app-form-textfield type="password" placeholder="Password" control={password} />
          <app-form-textfield type="password" placeholder="Confirm Password" control={confPassword} />
          <input type="submit" class="Button" value="Reset Password" />
        </form>
      </Host>
    );
  };
}
