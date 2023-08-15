import { LightningElement, wire } from "lwc";
import searchContacts from "@salesforce/apex/ContactController.searchContacts";

export default class ContactLookup extends LightningElement {
  searchText = "";

  @wire(searchContacts, { searchText: "$searchText" })
  contacts;

  handleChange(event) {
    const searchTextAux = event.target.value;
    console.log(searchTextAux);
    if (searchTextAux.lenght >= 3 || searchTextAux === "") {
      this.searchText = searchTextAux;
    }
    console.log(this.searchText);
  }
}
