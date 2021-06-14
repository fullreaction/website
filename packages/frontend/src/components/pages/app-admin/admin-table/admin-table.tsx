import { Component, h, Host, State } from '@stencil/core';
import { User } from '../../../../models/user.model';
import { AdminService } from '../../../../services/admin-service';
import { UserValidator } from '../../../../utils/userValidation';

@Component({
  tag: 'admin-table',
  styleUrl: 'admin-table.css',
})
export class AdminTable {
  @State() editMode = false;

  @State() data: (User & { selector?: HTMLInputElement })[] = [];

  private selection: HTMLInputElement[] = [];

  constructor() {
    AdminService.fetchList(e => (this.data = e));
  }
  clearSelection() {
    this.selection.forEach(check => {
      check.checked = false;
    });
  }

  isAllSelected() {
    return this.data.every(val => {
      return val.selector.checked;
    });
  }
  masterToggle() {
    console.log('testing');
    this.isAllSelected() ? this.clearSelection() : this.data.forEach(val => (val.checked = true));
  }

  delete() {
    this.data = [...this.data.filter((user, index) => !this.selection[index].checked)];
    this.clearSelection();
  }
  edit(user: User, property: string, ev) {
    const newField = ev.target.textContent.trim();

    if (user[property] !== newField) {
      const index = this.data.indexOf(user);
      this.data[index] = {
        ...user,
        [property]: newField,
        updated_at: new Date(),
      };
      UserValidator.validateUser(this.data[index]);
      this.data = [...this.data];
    }
  }

  revert() {
    AdminService.fetchList(e => (this.data = e));
  }
  apply() {
    console.log('Apply button');
    AdminService.commitList(this.data);
    AdminService.getList();
  }
  render = () => (
    <Host class="Table-Wrapper">
      <div class="Table-Actions">
        <button class="Table-Action Button">Add</button>
        <button class="Table-Action Button" onClick={() => this.delete()}>
          Remove
        </button>
        <button class="Table-Action Button" onClick={() => (this.editMode = !this.editMode)}>
          {this.editMode ? 'Finish' : 'Edit'}
        </button>
        <button class="Table-Action Button">Apply</button>
        <button class="Table-Action Button">Revert</button>
      </div>
      <table>
        <tr>
          <th class="Table-Header">
            <input type="checkbox" onChange={() => this.masterToggle()}></input>
          </th>
          <th class="Table-Header">Email</th>
          <th class="Table-Header">Password</th>
          <th class="Table-Header">Updated At</th>
        </tr>
        {this.data.map(user => (
          <tr>
            <td>
              <input type="checkbox" ref={e => this.selection.push(e)}></input>
            </td>
            <td contentEditable={this.editMode}>{user.user_email}</td>
            <td contentEditable={this.editMode}>{user.user_pass}</td>
            <td>{user.updated_at}</td>
          </tr>
        ))}
      </table>
    </Host>
  );
}
