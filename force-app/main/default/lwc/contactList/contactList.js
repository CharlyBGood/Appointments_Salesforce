import { LightningElement, wire } from "lwc";
// import getContacts from "@salesforce/apex/ContactController.getContacts";
import searchContacts from "@salesforce/apex/ContactController.searchContacts";
import { NavigationMixin } from "lightning/navigation";

export default class ContactList extends NavigationMixin(LightningElement) {
  searchText = "";

  @wire(searchContacts, { searchText: "$searchText" })
  contacts;

  handleChange(event) {
    const searchTextAux = event.target.value;
    console.log("Texto renderizado: " + searchTextAux);
    if (searchTextAux.length >= 3 || searchTextAux === "") {
      this.searchText = searchTextAux;
      console.log(this.searchText);
    }
  }

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
