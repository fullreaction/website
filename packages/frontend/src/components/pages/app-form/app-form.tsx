import { Component, forceUpdate, h, Host } from '@stencil/core';
import {
  emailValidator,
  minLengthValidator,
  requiredValidator,
  array,
  control,
  group,
  getClasses,
} from '../../../utils/form';

interface LoginForm {
  email: string;
  password: string;
  names: Array<{
    firstname: string;
    lastname: string;
  }>;
  reactions: Array<string>;
  address: {
    street: boolean;
    town: number;
    country: string;
  };
}

@Component({
  tag: 'app-form',
  styleUrl: 'app-form.css',
})
export class AppForm {
  model = group<LoginForm>({
    email: control('email', {
      validators: [minLengthValidator(8), requiredValidator, emailValidator],
    }),
    password: control('1234', {
      validators: [minLengthValidator(5), requiredValidator],
    }),
    names: array([this.addName('1', '2'), this.addName('1', '2'), this.addName('1', '2')]),
    reactions: array([control('smile'), control('happy')]),
    address: group({
      street: control(true),
      town: control(123),
      country: control('1-country'),
    }),
  });

  addName(firstname: string, lastname: string) {
    return group({
      firstname: control(firstname, { validators: [requiredValidator] }),
      lastname: control(lastname, { validators: [requiredValidator] }),
    });
  }
  addRow() {
    const names = this.model.controls.names;
    names.push(this.addName('a', 'b'));
  }

  componentDidLoad() {
    this.model.valueChanges.subscribe(() => forceUpdate(this));
    this.model.controls.email.statusChanges.subscribe(console.info);
  }

  submit() {
    console.log('submit');
  }

  render() {
    const form = this.model.controls;
    const names = form.names.controls;
    const reactions = form.reactions.controls;
    const address = form.address.controls;

    return (
      <Host>
        <form class="Auth-Form" onSubmit={this.submit}>
          <input
            type="email"
            value={form.email.value}
            class={getClasses({ 'Auth-Input': true, 'InputText': true }, form.email)}
            placeholder="Email address"
            required
            onInput={e => form.email.setValue((e.target as HTMLInputElement).value)}
          />
          <app-errors errors={form.email.errors} />

          <input
            type="password"
            value={form.password.value}
            class={getClasses({ 'Auth-Input': true, 'InputText': true }, form.password)}
            placeholder="Password"
            onInput={e => form.password.setValue((e.target as HTMLInputElement).value)}
            required
          />
          <app-errors errors={form.password.errors} />

          <fieldset>
            <legend>Names</legend>
            {names.map((control, i) => (
              <div>
                <labe htmlFor={`name[${i}]`}>Name {i}</labe>
                <input
                  id={`firstname[${i}]`}
                  type="text"
                  name={`name[${i}]`}
                  class="Auth-Input InputText"
                  value={control.controls.firstname.value}
                />
                <input
                  id={`name[${i}]`}
                  type="text"
                  name={`lastname[${i}]`}
                  class="Auth-Input InputText"
                  value={control.controls.lastname.value}
                />
              </div>
            ))}
            <input type="button" class="Auth-Input Button" value="add" onClick={() => this.addRow()} />
          </fieldset>
          <fieldset>
            <legend>Reactions</legend>
            {reactions.map((control, i) => (
              <div>
                <labe htmlFor={`name[${i}]`}>Reaction {i}</labe>
                <input
                  id={`reaction[${i}]`}
                  type="text"
                  name={`reaction[${i}]`}
                  class="Auth-Input InputText"
                  value={control.value}
                />
              </div>
            ))}
            <input type="button" class="Auth-Input Button" value="add" onClick={() => this.addRow()} />
          </fieldset>
          <fieldset>
            <legend>Address</legend>
            <input
              type="text"
              value={address.street.value.toString()}
              class={{
                'Auth-Input': true,
                'InputText': true,
              }}
              placeholder="Email address"
              required
            />
            <input
              type="text"
              value={address.town.value.toString()}
              class="Auth-Input InputText"
              placeholder="Email address"
              required
            />
            <input
              type="text"
              value={address.country.value.toString()}
              class="Auth-Input InputText"
              placeholder="Email address"
              required
            />
          </fieldset>

          <input type="submit" class="Auth-Input Button" value="Log in" />
        </form>
        <div class="Auth-Extra">
          <p>
            Forgotten your password?
            <a class="Auth-Link" href="">
              Click To Reset
            </a>
          </p>
          <p>
            Don&apos;t have an account yet?
            <a class="Auth-Link" href="">
              Register
            </a>
          </p>
        </div>
      </Host>
    );
  }
}
