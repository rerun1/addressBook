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
  this.addresses =[]
}
Contact.prototype.fullName = function(){
  return firstName + " " + lastName;
}
Contact.prototype.addAddress = function(address){
  this.addresses.push(address);
}
//Business Logic for Address object
function Address(street,city,state){
  this.street = street,
  this.city = city,
  this.state = state
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
  $("div#show-contact").show();
  $("span.first-name").html(contact.firstName);
  $("span.last-name").html(contact.lastName);
  $("span.phone-number").html(contact.phoneNumber);
  contact.addresses.forEach(function(address){
    htmlForAddressList += "<li>" + address.street + "<br>" + address.city + ", " + address.state + "</li>";
  });
  addressList.html(htmlForAddressList);
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

function resetForm(){
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input#new-phone-number").val("");
};
$(document).ready(function(){
  attachContactListeners();

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

    addressBook.addContact(newContact);

    displayContactDetails(addressBook);

    $("#add-address").click(function() {
      appendAddress();
    });

  });
});
