import { Component, h, Host, Prop, Event, EventEmitter, forceUpdate } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { AuthEndpoints } from '../../../../services/auth-endpoints';
import { control, emailValidator, group, minLengthValidator, requiredValidator } from '../../../../utils/form';
import { gvmError } from '../../../../utils/httpUtils';

interface Form {
  email: string;
  password: string;
  confPassword: string;
}

@Component({
  tag: 'app-register',
})
export class AppRegister {
  @Prop() error: gvmError | null = null;
  @Prop() history: RouterHistory;

  @Event() register: EventEmitter;

  private model = group<Form>({
    email: control('', { validators: [requiredValidator, emailValidator] }),
    password: control('', { validators: [requiredValidator, minLengthValidator(8)] }),
    confPassword: control('', { validators: [requiredValidator, minLengthValidator(8)] }),
  });

  async submit() {
    try {
      const { email, password } = this.model.getRawValue();
      const response = await AuthEndpoints.register(email, password);
      this.register.emit(response);
      this.history.push('/auth/login');
    } catch (error) {
      this.error = error;
    }
  }

  componentDidLoad() {
    this.model.valueChanges.subscribe(() => forceUpdate(this));
    this.model.statusChanges.subscribe(() => forceUpdate(this));
  }

  render() {
    const { email, password, confPassword } = this.model.controls;

    return (
      <Host>
        <form
          class="Form"
          onSubmit={async event => {
            event.preventDefault();
            if (this.model.valid) {
              await this.submit();
            }
          }}
        >
          <h2 class="Heading-2">Create Account</h2>
          {this.error && <div>{this.error.message}</div>}

          <app-form-textfield type="email" placeholder="Email address" control={email} />
          <app-form-textfield type="password" placeholder="Password" control={password} />
          <app-form-textfield type="password" placeholder="Confirm Password" control={confPassword} />

          <input type="submit" class="Button" value="Register" />

          <a class="Button Button-Inverted" href="/auth/login">
            Go back
          </a>
        </form>
      </Host>
    );
  }
}
