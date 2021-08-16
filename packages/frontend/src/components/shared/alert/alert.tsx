import { Component, Host, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'comp-alert',
  styleUrl: 'alert.css',
})
export class Alert {
  @Event() confirm: EventEmitter<boolean>;
  @Event() cancel: EventEmitter<boolean>;
  @Event() close: EventEmitter<boolean>;

  render = () => (
    <Host>
      <div class="Alert-Background">
        <div class="Alert-Content">
          <slot />
          <div class="Alert-Buttons">
            <button
              onClick={() => {
                this.confirm.emit(true);
              }}
              class="Alert-Button Button-Confirm"
            >
              Confirm
            </button>
            <button
              class="Alert-Button Button-Cancel"
              onClick={() => {
                this.cancel.emit(true);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Host>
  );
}
