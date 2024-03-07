import { LightningElement, api, wire } from "lwc";
import searchContacts from "@salesforce/apex/ContactController.searchContacts";
import CreateContactModal from "c/createContactModal";
import { NavigationMixin } from "lightning/navigation";

export default class ContactLookup extends NavigationMixin(LightningElement) {
  @api contactId;
  searchText = "";
  showList = false;
  addContact = true;
  value;

  @wire(searchContacts, { searchText: "$searchText" })
  contacts;

  handleChange(event) {
    const searchTextAux = event.target.value;
    console.log(searchTextAux);
    if (searchTextAux.length >= 3 || searchTextAux === "") {
      this.showList = true;
      this.searchText = searchTextAux;
      this.addContact = true;
    }
  }

  handleSelect(event) {
    this.value = event.detail;
    // const contactId = event.detail;
    // this.value = contactId;
    console.log("this contact Id value is: " + this.value);
    this.showList = false;
    this.addContact = false;
    // this[NavigationMixin.Navigate]({
    //   type: "standard__recordPage",
    //   attributes: {
    //     recordId: contactId,
    //     objectApiName: "Contact",
    //     actionName: "view"
    //   }
    // });
  }

  handleNewContact() {
    CreateContactModal.open({
      size: "large",
      description: "Accessible description of modal's purpose"
    });
  }
}
