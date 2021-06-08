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
          <app-highlight
            language="javascript"
            code={`import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}`}
          />
          <app-highlight
            language="css"
            code={`.Docs-Body H2 {
  margin-top: 0;
  font-size: 16px;
  font-weight: 500;
}
.Docs-Body P {
  margin: 0 0 18px 0;
}
.Docs-Body I {
  background-color: beige;
}
.Docs-Body B {
  font-weight: 600;
}
.Docs-Body blockquote {
  display: block;
  padding: 12px;
  margin: 0 0 18px 0;
  background-color: #eef5fb;
  border-radius: 3px;
}
.Docs-Body code {
  display: block;
  padding: 12px;
  margin-bottom: 18px;
  font-size: 14px;
  white-space: pre;
  background-color: #f3f3f3;
  border-radius: 3px;
}`}
          />
          <app-highlight
            language="html"
            code={`<Host class="Root">
  <app-section background noMargin>
    <app-header />
  </app-section>
  <stencil-router>
    <stencil-route-switch scrollTopOffset={0}>
      <stencil-route url="/" component="app-home" exact={true} />
      <stencil-route url="/docs" component="app-docs" />
      <stencil-route url="/auth" component="app-auth" />
    </stencil-route-switch>
  </stencil-router>
  <app-section style={{ marginTop: 'auto' }} background>
    <app-footer />
  </app-section>
</Host>`}
          />

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
