import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'dropdown-shell',
  styleUrl: 'dropdown-shell.css',
})
export class dropdownshell {
  render = () => (
    <Host class="Upload-Icon" draggable={false}>
      <div class="Upload-Inner-Image">
        <img
          class="Upload-Icon-Dots"
          src="\assets\icon\3Dots-icon.svg"
          onClick={e => e.stopPropagation()}
          draggable={false}
        />
        <div class="Upload-Dots-Wrapper">
          <div class="Upload-Dots-Content">
            <slot></slot>
          </div>
        </div>
      </div>
    </Host>
  );
}
