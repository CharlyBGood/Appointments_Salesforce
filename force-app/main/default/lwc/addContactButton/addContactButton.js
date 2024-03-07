import { LightningElement } from "lwc";

export default class AddContactButton extends LightningElement {

  createContact() {
    const createContact = new CustomEvent("addcontact");
    this.dispatchEvent(createContact);
  }
}
