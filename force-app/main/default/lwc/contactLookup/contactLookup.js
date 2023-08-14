import { LightningElement } from "lwc";
// import searchContacts from "@salesforce/apex/ContactController.getContacts";

export default class ContactLookup extends LightningElement {
  searchText = "";

  handleChange(event) {
    const searchTextAux = event.detail.value;
    if (searchTextAux.lenght >= 3 || searchTextAux === "") {
      this.searchText = searchTextAux;
    }
    console.log(this.searchText);
  }
}
