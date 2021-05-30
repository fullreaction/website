import { Component, h, Host } from '@stencil/core';

const integrations: { icon: string; name: string }[] = [
  { icon: '/assets/social-icons/Facebook.svg', name: 'Facebook' },
  { icon: '/assets/social-icons/LinkedIN.svg', name: 'Linkedin' },
  { icon: '/assets/social-icons/Instagram.svg', name: 'Instagram' },
  { icon: '/assets/social-icons/Twitter.svg', name: 'Twitter' },
  { icon: '/assets/social-icons/Youtube.svg', name: 'Youtube' },
  { icon: '/assets/social-icons/Github.svg', name: 'Github' },
  { icon: '/assets/social-icons/Reddit.svg', name: 'Reddit' },
  { icon: '/assets/social-icons/Pinterest.svg', name: 'Pinterest' },
  { icon: '/assets/social-icons/Vimeo.svg', name: 'Vimeo' },
  { icon: '/assets/social-icons/Blogger.svg', name: 'Blogger' },
  { icon: '/assets/social-icons/Dribbble.svg', name: 'Dribble' },
];

@Component({
  tag: 'app-integration',
  styleUrl: 'app-integration.css',
})
export class AppIntegration {
  render = () => (
    <Host class="Integration">
      <h2 class="Integration-Title Heading-2">Integrations</h2>
      <p class="Integration-Text Text-1">One API to publish your content to Facebook, Linkedin, Instagram, Youtube and more</p>
      <ul class="Integration-List">
        {integrations.map(platform => (
          <li class="Integration-Box Text-1">
            <img class="Integration-Image" src={platform.icon} height="80" width="80" alt={`${platform.name} icon`} />
            {platform.name}
          </li>
        ))}
      </ul>
      <div>
        <a class="Github-Button" href="https://github.com/fullreaction/fullreaction/issues" title="Create an issue on GitHub" target="_blank" rel="noreferrer">
          <img width="16" height="16" src="/assets/social-icons/Github.svg" alt="Github icon" />
          Missing a integration?
        </a>
      </div>
    </Host>
  );
}
