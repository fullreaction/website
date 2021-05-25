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
          <div class="sidenav-titles">Getting Started</div>
          <a class="first-lvl" href="#getting-started">
            Getting Started
          </a>
          <a class="second-lvl" href="#information">
            Information
          </a>
          <a class="second-lvl" href="#services">
            Services
          </a>
          <div class="sidenav-titles">Information</div>
          <a class="first-lvl" href="#product-info">
            Product Info
          </a>
          <a class="second-lvl" href="#company-info">
            Company Info
          </a>
          <div class="sidenav-titles">About</div>
          <a class="first-lvl" href="#about">
            About
          </a>
          <a class="second-lvl" href="#clients">
            Clients
          </a>
        </div>
      </div>
    );
  }
}
