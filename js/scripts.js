// Business Logic for AddressBook
function AddressBook (contact){
  this.contacts =[]
  this.currentId = 0;
}
AddressBook.prototype.addContact = function(contact){
  contact.id = this.assignId();
  this.contacts.push(contact);
}
AddressBook.prototype.assignId = function(){
  this.currentId += 1;
  return this.currentId;
}
AddressBook.prototype.findContact = function(id){
  for (var i = 0; i < this.contacts.length; i ++){
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}
AddressBook.prototype.deleteContact = function(id){
  for (var i = 0; i < this.contacts.length; i ++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}
// Business Logic for Contacts
function Contact (firstName,lastName,phoneNumber){
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.addresses =[],
  this.emails = []
}
Contact.prototype.fullName = function(){
  return firstName + " " + lastName;
}
Contact.prototype.addAddress = function(address){
  this.addresses.push(address);
}
Contact.prototype.addEmail = function(email){
  this.emails.push(email);
}
//Business Logic for Address object
function Address(street,city,state){
  this.street = street,
  this.city = city,
  this.state = state
}
//Business Logic for Email object
function Email(email){
  this.email = email
}
// User Interface Logic
var addressBook = new AddressBook();
function displayContactDetails(addressBookToDisplay){
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact){
    htmlForContactInfo += "<li id=" + contact.id + ">"+contact.firstName+" "+contact.lastName+"</li>";
  });
  contactsList.html(htmlForContactInfo);
};
function showContact(contactId){
  var contact = addressBook.findContact(contactId);
  var addressList = $("ul#addressListOutput");
  var htmlForAddressList = "";
  var emailList = $("ul#emailListOutput");
  var htmlForEmailList = "";
  $("div#show-contact").show();
  $("span.first-name").html(contact.firstName);
  $("span.last-name").html(contact.lastName);
  $("span.phone-number").html(contact.phoneNumber);
  contact.addresses.forEach(function(address){
    htmlForAddressList += "<li>" + address.street + "<br>" + address.city + ", " + address.state + "</li>";
  });
  addressList.html(htmlForAddressList);
  contact.emails.forEach(function(email){
    htmlForEmailList += "<li>" + email.email + "</li>";
  });
  emailList.html(htmlForEmailList);
  var buttons = $("div#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id="+contact.id+">DELETE</button>");
};
function attachContactListeners(){
  $("ul#contacts").on("click","li",function(){
    showContact(this.id);
  });
  $("div#buttons").on("click",".deleteButton",function(){
    addressBook.deleteContact(this.id);
    $("div#show-contact").hide();
    displayContactDetails(addressBook);
  });
};
function appendAddress(){
  $("div#addAddressForm").append('<h3>Add Additional Address:</h3>'+
  '<div class="addAddress">'+
  '<div class="form-group">'+
  '<label for="new-street">Street</label>'+
  '<input type="text" class="form-control" id="new-street">'+
  '</div>'+
  '<div class="form-group">'+
  '<label for="new-city">City</label>'+
  '<input type="text"  class="form-control" id="new-city">'+
  '</div>'+
  '<div class="form-group">'+
  '<label for="new-state">State</label>'+
  '<input type="text" class="form-control" id="new-state">'+
  '</div>'+
  '</div>');
};
function appendEmail(){
  $("div#addEmailForm").append('<h3>Add Additional Email:</h3>'+
  '<div class="addEmail">'+
  '<div class="form-group">'+
  '<label for="new-email">Email</label>'+
  '<input type="text" class="form-control" id="new-email">'+
  '</div>'+
  '</div>');
};

function resetForm(){
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input#new-phone-number").val("");
  $("input#new-street").val("");
  $("input#new-city").val("");
  $("input#new-state").val("");
  $("input#new-email").val("")
};
$(document).ready(function(){
  attachContactListeners();
  $("#add-address").click(function(){
    appendAddress();
  });
  $("#add-email").click(function(){
    appendEmail();
  });

  $("form#new-contact").submit(function(event){
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var newContact = new Contact(inputtedFirstName,inputtedLastName,inputtedPhoneNumber);
    $(".addAddress").each(function(){
      var inputtedStreet = $(this).find("input#new-street").val();
      var inputtedCity = $(this).find("input#new-city").val();
      var inputtedState = $(this).find("input#new-state").val();
      var newAddress = new Address(inputtedStreet,inputtedCity,inputtedState);
      newContact.addAddress(newAddress);
    });
    $(".addEmail").each(function(){
      var inputtedEmail = $(this).find("input#new-email").val();
      var newEmail = new Email(inputtedEmail);
      newContact.addEmail(newEmail);
    });

    addressBook.addContact(newContact);

    displayContactDetails(addressBook);

    resetForm();

    $("div#addAddressForm").empty();
    $("div#addEmailForm").empty();

  });

});
