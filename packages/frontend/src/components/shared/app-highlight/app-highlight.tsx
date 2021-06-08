import { Component, h, Host, Prop, State } from '@stencil/core';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';

@Component({
  tag: 'app-highlight',
  styleUrl: 'app-highlight.css',
})
export class AppHighlight {
  @Prop({ reflect: true }) language: 'javascript' | 'css' | 'html' = 'javascript';
  @Prop() code = '';

  @State() children: string;

  constructor() {
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('html', html);
    hljs.registerLanguage('css', css);
    this.children = hljs.highlight(this.code, { language: this.language }).value;
  }

  render() {
    return <Host class="Highlight" innerHTML={this.children} />;
  }
}
