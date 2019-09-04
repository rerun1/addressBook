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
AddressBook.prototype.updateContactPhone = function(id, string) {
  for (var i=0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        this.contacts[i].phoneNumber = string;
        return this.contacts[i].phoneNumber;
      }
    }
  };
  return false;
}
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


AddressBook.prototype.findContact = function(id) {
  for (var i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i].id == id) {
      return this.contacts[i];
    }
  }
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
