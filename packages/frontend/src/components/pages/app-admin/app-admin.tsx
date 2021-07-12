import { Component, h, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { store } from '../../../services/store';

@Component({
  tag: 'app-admin',
})
export class AppAuth {
  @Prop() history: RouterHistory;

  componentWillLoad() {
    if (store.state.user === null) {
      this.history.push('/auth/login');
    }
    if (this.history.location.pathname === '/admin') {
      this.history.push('/admin/panel');
    }
  }

  render = () => (
    <stencil-route-switch scrollTopOffset={0}>
      <stencil-route url="/admin/panel" component="admin-table" />
      <stencil-route url="/admin/upload" component="admin-upload" />
      <stencil-route component="app-missing-page" />
    </stencil-route-switch>
  );
}
