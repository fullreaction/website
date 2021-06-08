import { Component, h, Host, Prop } from '@stencil/core';
import highlight from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';

highlight.registerLanguage('javascript', javascript);
highlight.registerLanguage('html', html);
highlight.registerLanguage('css', css);

@Component({
  tag: 'app-highlight',
  styleUrl: 'app-highlight.css',
})
export class AppHighlight {
  @Prop({ reflect: true }) language: 'javascript' | 'css' | 'html' = 'javascript';
  @Prop() code = '';

  render() {
    return <Host class="Highlight" innerHTML={highlight.highlight(this.code, { language: this.language }).value} />;
  }
}
