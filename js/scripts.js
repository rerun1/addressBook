// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}
AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.addresses = [],
  this.emails = []
}
Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}
Contact.prototype.addAddress = function(address) {
  this.addresses.push(address);
}


// Business logic for Address Object
function Address(street,city,state){
  this.street = street,
  this.city = city,
  this.state = state
}

// User Interface Logic ---------
var addressBook = new AddressBook();
var currentAddressId = 0;
var newAdditionalAddress = new Address();

function displayContactDetails(addressBookToDisplay){
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact){
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};


function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  var htmlforAddressInfo = "";

  contact.addresses.forEach(function(address){
    htmlforAddressInfo += "<li>"  + address.street +"<br>" + address.city +", "+address.state+ "</li>";
  });

  $("#show-contact").show();
  // $("form#new-contact").hide();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $("ul#contactAddress").html(htmlforAddressInfo);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton, mr-3' id=" + contact.id + ">Delete</button><button class='addAddress' id=" + contact.id + ">Add Address</button>");
};

function deleteThisContact(contactId) {
  addressBook.deleteContact(contactId);
  // $("#show-contact").hide();
  displayContactDetails(addressBook);
};

function addAdditionalAddressId(contactId){
  currentAddressId = contactId;
  return currentAddressId;
};


function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    deleteThisContact(this.id);
  });
  $("#buttons").on("click", ".addAddress", function() {
    // $("#additionalAddressInput").show();
    addAdditionalAddressId(this.id);
  });
};
var resetForm = function(){
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input#new-phone-number").val("");
  $("input#new-email").val("");
  $("input#new-street").val("");
  $("input#new-city").val("");
  $("input#new-state").val("");
  $("input#additional-street").val("");
  $("input#additional-city").val("");
  $("input#additional-state").val("");
};

$(document).ready(function(){
  attachContactListeners();
  $("form#new-contact").submit(function(event){
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedStreet = $("input#new-street").val();
    var inputtedCity = $("input#new-city").val();
    var inputtedState = $("input#new-state").val();
    var inputtedEmail = $("input#new-email").val();


    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);

    var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState);

    newContact.addAddress(newAddress);

    addressBook.addContact(newContact);

    displayContactDetails(addressBook);

    // $("p#userInstructions").show();

    var additionalInputtedStreet = $("input#additional-street").val();
    var additionalInputtedCity = $("input#additional-city").val();
    var additionalInputtedState = $("input#additional-state").val();

    var newAdditionalAddress = new Address(additionalInputtedStreet, additionalInputtedCity, additionalInputtedState);

    resetForm();
  });

});
