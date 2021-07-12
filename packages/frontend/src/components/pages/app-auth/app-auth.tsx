import { Component, h, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'app-auth',
})
export class AppAuth {
  @Prop() history: RouterHistory;

  componentWillLoad() {
    if (this.history.location.pathname === '/auth') {
      this.history.push('/auth/login');
    }
  }

  render = () => (
    <stencil-route-switch scrollTopOffset={0} class="Auth-Slot">
      <stencil-route url="/auth/login" component="app-login" />
      <stencil-route url="/auth/register" component="app-register" />
      <stencil-route url="/auth/reset" component="app-reset" exact={true} />
      <stencil-route url="/auth/reset-complete" component="app-reset-complete" />
      <stencil-route component="app-missing-page" />
    </stencil-route-switch>
  );
}
