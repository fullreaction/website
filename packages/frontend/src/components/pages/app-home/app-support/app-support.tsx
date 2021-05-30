import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-support',
  styleUrl: 'app-support.css',
})
export class AppSupport {
  render() {
    return (
      <div class="Support-Box">
        <h2 class="Support-Header"> Support </h2>
        <div class="Support-Text">
          <p>One API to publish your content to Facebook, Linkedin, Instagram, Youtube and more</p>
        </div>
        <div class="Button-Box-Support">
          <a href="/docs" class="Support-Links">
            <button class="Support-Buttons">Documentation</button>
          </a>
          <a href="Github Link" class="Support-Links">
            <button class="Support-Buttons">
              <img src="../../assets/icon/Github.svg" class="Support-Icons"></img>Github
            </button>
          </a>
          <a href="Discord Link" class="Support-Links">
            <button class="Support-Buttons">
              <img src="../../assets/icon/Discord.svg" class="Support-Icons"></img>Discord
            </button>
          </a>
        </div>
      </div>
    );
  }
}
