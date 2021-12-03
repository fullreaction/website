import { Component, h, Host, Prop, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'image-view',
  styleUrl: 'image-view.css',
})
export class ImageView {
  @Prop() imageBlob: Blob;
  @Prop() hideArrows = true;
  @Prop() hideExit = true;
  @State() previewSrc: string;

  @Event({ eventName: 'leftArrowClick' })
  leftArrowClick: EventEmitter;

  @Event({ eventName: 'rightArrowClick' })
  rightArrowClick: EventEmitter;

  @Event({ eventName: 'exitClick' })
  exitClick: EventEmitter;
  clickHandler(clickedButton: string) {
    this[clickedButton].emit();
  }
  getImageBlobSrc() {
    if (this.imageBlob != null) {
      const reader = new FileReader();
      reader.readAsDataURL(this.imageBlob);
      reader.onloadend = () => {
        this.previewSrc = reader.result as string;
      };
    }
  }

  render = () => (
    <Host>
      {this.getImageBlobSrc()}
      <div class="Preview-Wrapper">
        <div
          class="Preview-Background"
          hidden={this.imageBlob == null}
          onClick={() => {
            this.previewSrc = null;
            this.imageBlob = null;
          }}
        >
          <button
            class="Preview-Button Preview-ButtonClose"
            hidden={this.hideExit}
            onClick={e => {
              e.stopPropagation();
              this.clickHandler('exitClick');
            }}
          >
            X
          </button>
          <button
            class="Preview-Button Preview-ButtonLeft"
            hidden={this.hideArrows}
            onClick={e => {
              e.stopPropagation();
              this.clickHandler('leftArrowClick');
            }}
          >
            {'<'}
          </button>
          <button
            class="Preview-Button Preview-ButtonRight"
            hidden={this.hideArrows}
            onClick={e => {
              e.stopPropagation();
              this.clickHandler('rightArrowClick');
            }}
          >
            {'>'}
          </button>
          <div class="Preview-ImageWrapper">
            <img
              class="Preview-Image"
              onClick={e => {
                e.stopPropagation();
              }}
              src={this.previewSrc}
            />
          </div>
        </div>
      </div>
    </Host>
  );
}
