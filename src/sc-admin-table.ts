import { LitElement, html } from 'lit'
import { customElement, property, state, query } from 'lit/decorators.js'
import '@shoelace-style/shoelace';
import shoelace_light from '@shoelace-style/shoelace/dist/themes/light.styles.js';

type AdminTableConfig = {
  fields: Array<{
    label: string;
    name: string;
  }>;
}
@customElement('sc-admin-table')
export class AdminTableElement extends LitElement {

  static styles = [shoelace_light];
  
  @property()
  config: AdminTableConfig;

  @property()
  data: Array<object>;

  @query('sl-dialog#edit-dialog')
  editDialog: HTMLElement;

  add() {
    (this.editDialog as any)?.show();
  }

  render() {
    return html`
      <table>
        <thead>
          <tr>
            ${this.config?.fields.map((field) => html`
              <th>${field.label}</th>
            `)}
          </tr>
        </thead>
        <tbody>
          ${this.data?.map((datum, index) => html`
            <tr>
              ${this.config?.fields.map((field) => html`<td>${datum[field.name]}</td>`)}
            </tr>
          `)}
        </tbody>
      </table>
      <sl-button id="add-button" @click=${this.add}>Add</sl-button>
      <sl-dialog id="edit-dialog">
        <form>
          ${this.config?.fields.map((field) => html`
          <sl-input name=${field.name} label=${field.label}></sl-input>
          `)}
        </form>
      </sl-dialog>
    `;
  }
}