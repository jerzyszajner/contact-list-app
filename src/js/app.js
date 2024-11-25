const form = document.querySelector(".contact-app__form");
const firstnameInput = document.querySelector("[name='firstname']");
const lastnameInput = document.querySelector("[name='lastname']");
const phoneInput = document.querySelector("[name='phone-number']");
const addressInput = document.querySelector("[name='address']");
const submitButton = form.querySelector(".form__submit-button");

//DECLARING VARIABLES
const contacts = [];

const addContacts = (e) => {
  e.preventDefault();
  const contact = {
    id: Date.now(),
    contactFirstname: firstnameInput.value,
    contactLastname: lastnameInput.value,
    contactPhoneNumber: phoneInput.value,
    contactAddress: addressInput.value,
  };
  contacts.push(contact);
  console.log(contacts);
};

// ADD EVENT LISTENER TO THE CONTACTS
form.addEventListener("submit", addContacts);
