import { Component, h, Host, Event, EventEmitter } from '@stencil/core';
@Component({
  tag: 'comp-searchbar',
  styleUrl: 'searchbar.css',
})
export class Searchbar {
  @Event({
    eventName: 'search',
  })
  search: EventEmitter<string>;
  SearchHandler(searchWord: string) {
    this.search.emit(searchWord);
  }
  render = () => (
    <Host class="searchbar">
      <input
        class="Upload-Searchbar"
        type="text"
        placeholder="Search"
        onInput={e => this.SearchHandler((e.target as HTMLInputElement).value)}
      />
    </Host>
  );
}
