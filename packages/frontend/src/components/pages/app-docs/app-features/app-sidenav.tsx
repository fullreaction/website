import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'app-sidenav',
  styleUrl: 'app-sidenav.css',
})
export class AppSidenav {
  render() {
    return (
      <Host class="Sidenav">
        <div class="Sidenav-Title">Getting Started</div>
        <a class="Sidenav-Link" href="#getting-started">
          Getting Started
        </a>
        <div class="Sidenav-LinkBlock">
          <a class="Sidenav-Link" href="#information">
            Information
          </a>
          <a class="Sidenav-Link" href="#services">
            Services
          </a>
        </div>

        <div class="Sidenav-Title">Information</div>
        <a class="Sidenav-Link" href="#product-info">
          Product Info
        </a>
        <div class="Sidenav-LinkBlock">
          <a class="Sidenav-Link" href="#company-info">
            Company Info
          </a>
        </div>

        <div class="Sidenav-Title">About</div>
        <a class="Sidenav-Link" href="#about">
          About
        </a>
        <a class="Sidenav-Link" href="#clients">
          Clients
        </a>
      </Host>
    );
  }
}
