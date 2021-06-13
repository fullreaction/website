import { Component, h, Host, Prop, Watch } from '@stencil/core';
import { ValidationErrors } from '../../../utils/form';

const assemble = (literal, params) => new Function(params, 'return `' + literal + '`;');

const isObject = obj => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

@Component({
  tag: 'app-errors',
  styleUrl: 'app-errors.css',
})
export class AppErrors {
  @Prop() errors: ValidationErrors | null = {};
  @Prop() templates: { [key: string]: string } = {};

  @Watch('errors')
  errorsChange(newValue: boolean) {
    console.log(newValue);
  }

  @Watch('templates')
  watchHandler(newValue: boolean) {
    this.combinedTemplates = Object.assign(this.defaultTemplates, newValue);
  }

  componentWillLoad() {
    this.combinedTemplates = Object.assign(this.defaultTemplates, this.templates);
  }

  defaultTemplates = {
    required: 'Required',
    email: 'Not email',
    minlength: 'Not long enough. ${actualLength} / ${requiredLength}',
  };

  combinedTemplates: { [key: string]: any } = {};

  getError(key: string) {
    if (isObject(this.errors[key])) {
      const params = Object.keys(this.errors[key]);
      const values = Object.values(this.errors[key]);
      return assemble(this.combinedTemplates[key], params)(...values);
    } else {
      return this.combinedTemplates[key];
    }
  }

  render() {
    return (
      <Host class="Errors">
        {this.errors !== null && (
          <ul class="Errors-Wrap">
            {Object.keys(this.errors).map(errorKey => (
              <li class="Errors-List">{this.getError(errorKey)}</li>
            ))}
          </ul>
        )}
      </Host>
    );
  }
}
