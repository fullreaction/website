import { Component, h, Host, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'itembox-content',
  styleUrl: 'itembox-content.css',
})
export class UploadItemContent {
  @Prop() itemName: string;
  @Prop() itemIcon: string;
  @Prop() showDots = false;

  @Event({
    eventName: 'itemClick',
  })
  itemClick: EventEmitter;

  itemClickHandler() {
    this.itemClick.emit();
  }

  render = () => (
    <Host class="Upload-ItemWrap">
      <div class="Upload-Item">
        <img class="Upload-Outer-Image" src={this.itemIcon} onClick={() => this.itemClickHandler()} />
        <span class="Upload-Image-Text">{this.itemName}</span>
      </div>
      <div class="Upload-Icon" hidden={!this.showDots}>
        <div class="Upload-Inner-Image">
          <img class="Upload-Icon-Dots" src="\assets\icon\3Dots-icon.svg" onClick={e => e.stopPropagation()} />
          <slot />
        </div>
      </div>
    </Host>
  );
}
