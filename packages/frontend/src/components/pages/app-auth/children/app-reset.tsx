import { Component, h, Host } from '@stencil/core';
import { AuthEndpoints } from '../../../../services/auth-endpoints';
import { control, emailValidator, group, requiredValidator } from '../../../../utils/form';

interface Form {
  email: string;
}
@Component({
  tag: 'app-reset',
})
export class AppReset {
  private model = group<Form>({
    email: control('', { validators: [requiredValidator, emailValidator] }),
  });

  reset() {
    try {
      const { email } = this.model.getRawValue();
      AuthEndpoints.requestReset(email);
    } catch (error) {
      console.error(error);
    }
  }
  render = () => {
    const { email } = this.model.controls;

    return (
      <Host class="Form">
        <h2 class="Heading-2">Reset password</h2>
        <form
          class="Form"
          onSubmit={event => {
            event.preventDefault();
            if (this.model.valid) {
              this.reset();
            }
          }}
        >
          <app-form-textfield type="email" placeholder="Email address" control={email} />

          <input type="submit" class="Button" value="Continue" />

          <a class="Button Button-Inverted" href="/auth/login">
            Go back
          </a>
        </form>
      </Host>
    );
  };
}
