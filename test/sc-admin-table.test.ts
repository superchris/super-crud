import { expect } from "@esm-bundle/chai";
import { fixture, oneEvent } from '@open-wc/testing';
import { AdminTableElement } from "../src/sc-admin-table";
import "../src/sc-admin-table";

describe('sc-admin-table', () => {
  let adminTable: AdminTableElement;
  beforeEach(async function() {
    adminTable = await fixture('<sc-admin-table></sc-admin-table>') as AdminTableElement;
    adminTable.config = {
      fields: [{name: 'foo', label: 'Foo'}]
    }
    adminTable.data = [{foo: 'bar'}, {foo: 'baz'}];
    await adminTable.updateComplete;
  });

  it('adds colums for each field', async () => {
    
    expect(adminTable.shadowRoot.innerHTML).to.contain('Foo</th>');
    expect(adminTable.shadowRoot.innerHTML).to.contain('baz</td>');
  });

  it('has a form to add items', async () => {
    const addButton = adminTable.shadowRoot.querySelector('#add-button') as HTMLButtonElement;
    addButton.click();
    await adminTable.updateComplete;

    expect(adminTable.shadowRoot.innerHTML).to.contain('<form>');
    const fooInput = adminTable.shadowRoot.querySelector('sl-input[name="foo"]') as HTMLInputElement;
    fooInput.value = 'blarg';
    const saveButton = adminTable.shadowRoot.querySelector('#save-button') as HTMLButtonElement;
    // yikes async 'fun'
    setTimeout(() => saveButton.click());
    const { detail } = await oneEvent(adminTable, 'sc-save');
    expect(detail.data.foo).to.equal('blarg');
  });
});