import { LightningElement, wire } from "lwc";
import getContacts from "@salesforce/apex/ContactController.getContacts";
import { NavigationMixin } from "lightning/navigation";

export default class ContactList extends NavigationMixin(LightningElement) {
  @wire(getContacts)
  contacts;

  handleSelect(event) {
    const contactId = event.detail;
    this[NavigationMixin.Navigate]({
      type: "standard__recordPage",
      attributes: {
        recordId: contactId,
        objectApiName: "Contact",
        actionName: "view"
      }
    });
  }
}
