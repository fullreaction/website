import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-docs',
  styleUrl: 'app-docs.css',
  shadow: true,
})
export class AppDocs {
  render() {
    return (
      <div class="app-docs">
        <div class="sidenav">
        <a href="#getting-started">Getting Started</a>
          <a href="#information">Information</a>
          <a href="#services">Services</a>
          <a href="#product-info">Product Info</a>
          <a href="#company-info">Company Info</a>
          <a href="#about">About</a>
          <a href="#clients">Clients</a>

        </div>

        <div class="main"></div>
      </div>
    );
  }
}
