import { LightningElement, api } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { NavigationMixin } from "lightning/navigation";
// import checkDuplicate from "@salesforce/apex/SearchContacts.checkDuplicate";
import searchContacts from "@salesforce/apex/ContactController.searchContacts";
// import FIRST_NAME_FIELD from "@salesforce/schema/Contact.FirstName";
// import LAST_NAME_FIELD from "@salesforce/schema/Contact.LastName";
import NAME_FIELD from "@salesforce/schema/Contact.Name";
import CONTACT_OBJECT from "@salesforce/schema/Contact";

import { createRecord } from "lightning/uiRecordApi";

export default class createContactsuiRecordApi extends NavigationMixin(
  LightningElement
) {
  contactId;

  searchText = "";

  handleNameChange(ev) {
    this.contactId = undefined;
    this.searchText = ev.target.value;
  }

  @api createContact() {
    searchContacts({ searchText: "$searchText" })
      .then((result) => {
        if (result) {
          const fields = {};
          fields[NAME_FIELD.fieldApiName] = this.searchText;
          const recordInput = { apiName: CONTACT_OBJECT.objectApiName, fields };
          createRecord(recordInput)
            .then((contact) => {
              this.contactId = contact.id;
              const toastEv = new ShowToastEvent({
                title: "Contact created",
                message: "Record Name: " + this.searchText,
                variant: "success"
              });
              this.dispatchEvent(toastEv);
              this[NavigationMixin.Navigate]({
                type: "standard__recordPage",
                attributes: {
                  objectApiName: "Contact",
                  actionName: "view",
                  recordId: this.contactId
                }
              });
            })
            .catch((error) => {
              this.dispatchEvent(
                new ShowToastEvent({
                  title: "Error creating record",
                  message: error,
                  variant: "error"
                })
              );
            });
          //
          //
        } else {
          this.dispatchEvent(
            new ShowToastEvent({
              title: "Error",
              message: "This contact already exists!",
              error: "error"
            })
          );
        }
      })
      .catch((error) => {
        console.error("Error comparing duplicates", error);
      });
  }
}
