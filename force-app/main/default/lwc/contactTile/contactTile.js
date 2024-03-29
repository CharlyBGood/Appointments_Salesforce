import { LightningElement, api } from "lwc";

export default class ContactTile extends LightningElement {
  @api contact;

  handleClick() {
    const selectEvent = new CustomEvent("select", {
      detail: this.contact.Id
    });
    this.dispatchEvent(selectEvent);
  }
}
