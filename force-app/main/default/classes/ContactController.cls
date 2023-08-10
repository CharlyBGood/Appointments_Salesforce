public with sharing class ContactController {
  public static List<Contact> searchContacts(String searchText) {
    try {
      String likeValue = '%' + searchText + '%';
      return [
        SELECT Id, Name
        FROM Contact
        WHERE Name LIKE :likeValue
        WITH SECURITY_ENFORCED
      ];
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
  @AuraEnabled(cacheable=true)
  public static List<Contact> getContacts() {
    return [SELECT Id, Name FROM Contact WITH SECURITY_ENFORCED LIMIT 21];
  }
}
