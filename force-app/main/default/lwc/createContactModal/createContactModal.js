import LightningModal from "lightning/modal";

export default class CreateContactModal extends LightningModal {
  handleOkay() {
    this.template
      .querySelector("c-create-contactsui-record-api")
      .createContact();
    this.close("okay");
  }
}
