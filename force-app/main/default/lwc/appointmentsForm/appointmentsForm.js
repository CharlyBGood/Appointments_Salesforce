import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { NavigationMixin } from "lightning/navigation";
import APPOINTMENT__OBJECT from "@salesforce/schema/Appointment__c";
import DATE_FIELD from "@salesforce/schema/Appointment__c.Date__c";
import CONTACT_FIELD from "@salesforce/schema/Appointment__c.Contact__c";
import DURATION_FIELD from "@salesforce/schema/Appointment__c.Duration__c";
import CreateContactModal from "c/createContactModal";

export default class AppointmentsForm extends NavigationMixin(
  LightningElement
) {
  objApiName = APPOINTMENT__OBJECT;
  date = DATE_FIELD;
  duration = DURATION_FIELD;
  contact = CONTACT_FIELD;
  appointmentSubject = "";
  appointmentId;

  handleApptChange(e) {
    this.appointmentSubject = e.target.value;
    console.log(this.appointmentSubject);
  }

  // manage child customEvent to navigate to create record modal (new contact button)
  // handleContactCreated() {
  //   this[NavigationMixin.Navigate]({
  //     type: "standard__objectPage",
  //     attributes: {
  //       objectApiName: "Contact",
  //       actionName: "new"
  //     }
  //   });
  // }

  async handleContactCreated() {
    const result = await CreateContactModal.open({
      size: "large",
      description: "Accessible description of modal's purpose"
    });
    return result;
  }

  handleSuccess(event) {
    this.appointmentId = event.detail.id;
    const toastEv = new ShowToastEvent({
      title: "Appointment created",
      message: "Appointment record name: " + this.appointmentSubject,
      variant: "success"
    });
    this.dispatchEvent(toastEv);
    this[NavigationMixin.Navigate]({
      type: "standard__recordPage",
      attributes: {
        objectApiName: "Appointment__c",
        actionName: "view",
        recordId: this.appointmentId
      }
    });
  }
}
