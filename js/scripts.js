// var mom = new Contact {firstName: "Carol", lastName: "McClelland", phoneNumber: "503-319-2912"};
// var patsy = new Contact {firstName: "Patsy", lastName: "Aplin", phoneNumber: "503-936-1059"};
// var margaret = new Contact {firstName: "Margaret", lastName: "Long", phoneNumber: "206-819-8057"};
// var mike = new Contact {firstName: "Mike", lastName: "McClelland", phoneNumber: "541-929-6731"};
// var ron = new Contact {firstName: "Ron", lastName: "Rubino", phoneNumber: "503-329-4783"};
// var jessica =  {firstName: "Jessica", lastName: "Poonpirom", phoneNumber: "503-989-7228"};
// var julia = new Contact {firstName: "Julia", lastName: "Rubino", phoneNumber: "503-679-7716"};



//Business Logic for AddressBook
function AddressBook(){
  this.contacts = [];
  this.currentID = 0;
}
AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}
AddressBook.prototype.assignId = function(){
  this.currentID += 1;
  return this.currentID;
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
// AddressBook.prototype.updateContactPhone = function(id, string) {
//   for (var i=0; i < this.contacts.length; i++) {
//     if (this.contacts[i]) {
//       if (this.contacts[i].id == id) {
//         this.contacts[i].phoneNumber = string;
//         return this.contacts[i].phoneNumber;
//       }
//     }
//   };
//   return false;
// }
AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

//Business Logic for Contacts
function Contact (firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}
Contact.prototype.fullName = function(){
  return this.firstName + " " + this.lastName;
}

var resetForm = function(){
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input#new-phone-number").val("");
}

// User Logic
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay){
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact){
    htmlForContactInfo += "<li id="+contact.id+">"+contact.firstName+" "+contact.lastName+"</li>";
  });
  contactsList.html(htmlForContactInfo);
};
function attachContactListener(){
  $("ul#contacts").on("click", "li", function(){
    console.log("the id of this <li> is "+this.id+".");
  });
};

$(document).ready(function(){
  attachContactListener();
  $("form#new-contact").submit(function(event){
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
    addressBook.addContact(newContact);
    console.log(addressBook.contacts);
    displayContactDetails(addressBook);
    resetForm();
    event.preventDefault();
  });
});






//
// var tomatoes = {name: "Tomatoes", price: 2.99};
// var cucumbers = {name: "Cucumbers", price: 0.99};
// var onions = {name: "Onions", price: 0.79};
//
// var groceryStore = {name: "Michael's Corner Market", products: [tomatoes, cucumbers, onions]};
//
// var iPhone = {name: "iPhone", price: 699};
// var android = {name: "Android", price: 499 }
// var android = {name: "Android", price: 499 };
// var windowsPhone =  {name: "Windows Phone", price: 399};
//
// var phoneStore =  {name: "RadioShack", products: [iPhone, android, windowsPhone]};
//
// var stores = [groceryStore, phoneStore];
// var output = [];
// stores.forEach(function(store){
//   output.push(store.name + " sells: ")
//   store.products.forEach(function(product){
//     output.push(product.name + ", ");
//   });
// });
//
// console.log(output.join(""));
