import { Component, h } from '@stencil/core';

@Component({
  tag: 'dropdown-btn',
  styleUrl: 'dropdownbtn.css',
})
export class DropDownButton {
  render = () => (
    <button class="Content-Item">
      <slot />
    </button>
  );
}
