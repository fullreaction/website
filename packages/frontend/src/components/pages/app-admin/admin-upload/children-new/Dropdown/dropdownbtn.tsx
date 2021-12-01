import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'dropdown-btn',
  styleUrl: 'dropdownbtn.css',
})
export class dropdownbtn {
  render = () => (
    <button class="Content-Item">
      <slot />
    </button>
  );
}
