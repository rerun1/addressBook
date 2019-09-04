//Business Logic for AddressBook
function AddressBook(){
  this.contacts = [];
}
AddressBook.prototype.addContact = function(contact) {
  this.contacts.push(contact);
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
