import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-docs',
  styleUrl: 'app-docs.css',
})
export class AppDocs {
  render() {
    return (
      <app-section>
        <app-sidenav />
        <div class="Docs-Body">
          <h1 id="getting-started">Enclosing quotation marks</h1>
          <p>
            Let’s say you’re <i>trying to use quotation marks inside</i> a string. <b>You’ll need to use</b> opposite <u>and outside</u>. That means strings containing single
            quotes need to use double quotes and strings containing double quotes need to use single quotes.
          </p>
          <h2 id="getting-started">Sub heading</h2>
          <p>
            Let’s say you’re <i>trying to use quotation marks inside</i> a string. <b>You’ll need to use</b> opposite <u>and outside</u>. That means strings containing single
            quotes need to use double quotes and strings containing double quotes need to use single quotes.
          </p>
          <blockquote>
            Let’s say you’re trying to use quotation marks inside a string. You’ll need to use opposite quotation marks inside and outside.
            <ul>
              <li>That means strings containing</li>
              <li>single</li>
              <li>quotes need to use double quotes and</li>
            </ul>
            strings containing double quotes need to use single quotes. asdf asdf{' '}
          </blockquote>
          <code>
            {`import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}`}
          </code>
          <h2 id="getting-started">Properties and methods</h2>
          <p>
            Let’s say you’re <i>trying to use quotation marks inside</i> a string. <b>You’ll need to use</b> opposite <u>and outside</u>. That means strings containing single
            quotes need to use double quotes and strings containing double quotes need to use single quotes.
          </p>
        </div>
      </app-section>
    );
  }
}
