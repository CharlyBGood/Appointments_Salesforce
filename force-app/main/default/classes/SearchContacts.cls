public with sharing class SearchContacts {
    @AuraEnabled(cacheable=true)
    public static List<Contact> findContactsWithAppointment() {
      return [
        SELECT Id, Name
        FROM Contact
        WHERE
          Id IN (
            SELECT Contact__c
            FROM Appointment__c
          )
        WITH SECURITY_ENFORCED
        LIMIT 10
      ];
    }

    @AuraEnabled
  public static Boolean checkDuplicate(String firsName, String lastName) {
    try {
      List<Contact> existingContacts = [
        SELECT Id
        FROM Contact
        WHERE FirstName = :firsName AND LastName = :lastName
        WITH SECURITY_ENFORCED
        LIMIT 1
      ];
      return !existingContacts.isEmpty();
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled(cacheable=true)
  public static List<Contact> searchContactsOnInput(String searchText) { 
        String likeValue = '%' + searchText + '%';
        return [
          SELECT Id, Name
          FROM Contact
          WHERE Name LIKE :likeValue
          WITH SECURITY_ENFORCED
          LIMIT 6
        ];
    }
}