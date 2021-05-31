import { Component, h, Host } from '@stencil/core';

/*
  Things to think about:

  * Front end......

  * Services {
    * Setting up @Injectable() yourself
    * Observables?
    * fetch() instead of httpClient {
      * learn how to read readableStream
    }
  }

  * gvmHttpErrorResponse{
      * extends angular HttpErrorResponse
      * uses angular HttpHeaders
  }



*/

@Component({
  tag: 'app-root',
})
export class AppRoot {
  render = () => (
    <Host>
      <app-section background noMargin>
        <app-header />
      </app-section>
      <stencil-router>
        <stencil-route-switch scrollTopOffset={0}>
          <stencil-route url="/" component="app-home" exact={true} />
          <stencil-route url="/docs" component="app-docs" />
        </stencil-route-switch>
      </stencil-router>
      <app-section background>
        <app-footer />
      </app-section>
    </Host>
  );
}
