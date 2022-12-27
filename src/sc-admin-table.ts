import { LitElement, html } from 'lit'
import { customElement, property, state, query } from 'lit/decorators.js'
import '@shoelace-style/shoelace';
import { serialize } from '@shoelace-style/shoelace/dist/utilities/form.js';
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

  @query('sl-dialog#edit-dialog form')
  form: HTMLFormElement;

  add() {
    (this.editDialog as any)?.show();
  }

  save() {
    const data = serialize(this.form);
    this.dispatchEvent(new CustomEvent('sc-save', {detail: { data } }));
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
          <sl-button id="save-button" @click=${this.save}>Save</sl-button>
        </form>
      </sl-dialog>
    `;
  }
}