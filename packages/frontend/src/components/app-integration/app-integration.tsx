import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-integration',
  styleUrl: 'app-integration.css',
  shadow: true,
})
export class AppIntegration {
  render() {
    return (
      <div class="App-Integration">
        <div class="Integration-Title">Integration</div>
        <div class="Integration-Text">
          One API to publish your content to <br /> Facebook, Linkedin, Instagram, Youtube
          <br /> and more{' '}
        </div>
        <div class="Integration-List">
          {' '}
          <div class="Integration-Box">
            {' '}
            <img class="Integration-Image" src="assets\integration icons\Facebook.png" />
            Facebook
          </div>
          <div class="Integration-Box">
            {' '}
            <img class="Integration-Image" src="assets\integration icons\Linkedin.png" />
            Linkedin
          </div>
          <div class="Integration-Box">
            {' '}
            <img class="Integration-Image" src="assets\integration icons\Instagram.png" />
            Instagram
          </div>
          <div class="Integration-Box">
            {' '}
            <img class="Integration-Image" src="assets\integration icons\Twitter.png" />
            Twitter
          </div>
          <div class="Integration-Box">
            {' '}
            <img class="Integration-Image" src="assets\integration icons\Youtube.png" />
            Youtube
          </div>
          <div class="Integration-Endbox">
            {' '}
            <img class="Integration-Image" src="assets\integration icons\Github.png" />
            Github
          </div>
          <div class="Integration-Box">
            {' '}
            <img class="Integration-Image" src="assets\integration icons\Reddit.png" />
            Reddit
          </div>
          <div class="Integration-Box">
            {' '}
            <img class="Integration-Image" src="assets\integration icons\Pinterest.png" />
            Pinterest
          </div>
          <div class="Integration-Box">
            {' '}
            <img class="Integration-Image" src="assets\integration icons\Vimeo.png" />
            Vimeo
          </div>
          <div class="Integration-Box">
            {' '}
            <img class="Integration-Image" src="assets\integration icons\Blogger.png" />
            Blogger
          </div>
          <div class="Integration-Box">
            {' '}
            <img class="Integration-Image" src="assets\integration icons\Dribble.png" />
            Dribble
          </div>
        </div>
      </div>
    );
  }
}
