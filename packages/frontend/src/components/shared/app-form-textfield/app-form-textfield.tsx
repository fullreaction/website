import { Component, forceUpdate, h, Host, Prop } from '@stencil/core';
import { FormControl, getFormClasses } from '../../../utils/form';

@Component({
  tag: 'app-form-textfield',
  styleUrl: 'app-form-textfield.css',
})
export class AppFormTextfield {
  @Prop() control: FormControl<any>;
  @Prop() type = 'text';
  @Prop() placeholder = '';

  componentDidLoad() {
    this.control.valueChanges.subscribe(() => forceUpdate(this));
  }

  render() {
    return (
      <Host class="Form-Textfield">
        <input
          type={this.type}
          class={{ InputText: true, ...getFormClasses(this.control) }}
          value={this.control.value}
          onInput={e => this.control.setValue((e.target as HTMLInputElement).value)}
          placeholder={this.placeholder}
          onBlur={() => {
            this.control.markAsTouched();
            forceUpdate(this);
          }}
        />
        {this.control.invalid && this.control.touched && <app-errors errors={this.control.errors} />}
      </Host>
    );
  }
}
