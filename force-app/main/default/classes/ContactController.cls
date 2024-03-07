public with sharing class ContactController {
  @AuraEnabled(cacheable=true)
  public static List<Contact> searchContacts(String searchText) {
    String likeValue = '%' + searchText + '%';
    return [
      SELECT Id, Name
      FROM Contact
      WHERE Name LIKE :likeValue
      WITH SECURITY_ENFORCED
      LIMIT 11
    ];
  }
  // @AuraEnabled(cacheable=true)
  // public static List<Contact> getContacts() {
  //   return [SELECT Id, Name FROM Contact WITH SECURITY_ENFORCED LIMIT 21];
  // }
}
