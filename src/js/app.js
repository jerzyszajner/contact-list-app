// SELECTING ELEMENTS
const form = document.querySelector(".contact-app__form");
const firstnameInput = document.querySelector("[name='firstname']");
const lastnameInput = document.querySelector("[name='lastname']");
const phoneInput = document.querySelector("[name='phone-number']");
const addressInput = document.querySelector("[name='address']");
const submitButton = form.querySelector(".form__submit-button");
const contactList = document.querySelector(".contacts__list");
const searchInput = document.querySelector(".search__input");
const searchOption = document.querySelector(".search__filter");

//DECLARING VARIABLES
const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

let editContactId = null;

// RENDERING CONTACTS WHEN THE PAGE FIRST LOADED
document.addEventListener("DOMContentLoaded", () => renderContacts(contacts));

// FUNCTION FOR ADDING CONTACTS TO THE LIST
const addContacts = (e) => {
  e.preventDefault();
  const contact = {
    id: Date.now(),
    contactFirstname: firstnameInput.value,
    contactLastname: lastnameInput.value,
    contactPhoneNumber: phoneInput.value,
    contactAddress: addressInput.value,
  };

  if (editContactId) {
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === editContactId
    );
    if (contactIndex !== -1) {
      contacts[contactIndex] = contact;
    }
    editContactId = null;
  } else {
    contacts.push(contact);
  }

  storeContacts(contacts);
  renderContacts(contacts);
  form.reset();
};

// FUNCTION FOR THE STORING CONTACTS IN LOCAL STORAGE
const storeContacts = (contactsArray) => {
  localStorage.setItem("contacts", JSON.stringify(contactsArray));
};

// FUNCTION FOR DELETING CONTACTS FORM THE LIST
const deleteContacts = (id) => {
  const remainingContacts = contacts.filter((contact) => contact.id !== id);
  storeContacts(remainingContacts);
  renderContacts(remainingContacts);
};

// FUNCTION FOR EDITING CONTACTS
const editContacts = (e, id) => {
  const contactToEdit = contacts.find((contact) => contact.id === id);
  const contactRow = e.target.closest(".contacts-item");
  if (contactToEdit) {
    firstnameInput.value = contactToEdit.contactFirstname;
    lastnameInput.value = contactToEdit.contactLastname;
    phoneInput.value = contactToEdit.contactPhoneNumber;
    addressInput.value = contactToEdit.contactAddress;
    editContactId = id;
    submitButton.textContent = "Update Contact";
    contactRow.style.backgroundColor = "#FFFED3";
  } else {
    submitButton.textContent = "Add Contact";
    contactRow.style.backgroundColor = "#d4f6ff";
  }
};

// FUNCTION FOR RENDERING THE CONTACTS ON THE DOM
const renderContacts = (contactsArray) => {
  contactList.textContent = "";
  contactsArray.forEach((contact, index) => {
    // CREATE ELEMENTS
    const contactItem = document.createElement("li");
    const contactListNumber = document.createElement("span");
    const contactFullname = document.createElement("span");
    const contactPhoneNumber = document.createElement("span");
    const contactAddress = document.createElement("span");
    const contactTools = document.createElement("span");
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");

    // APPEND ELEMENTS
    contactList.append(contactItem);
    contactItem.append(
      contactListNumber,
      contactFullname,
      contactPhoneNumber,
      contactAddress,
      contactTools
    );
    contactTools.append(deleteButton, editButton);

    // INSERT CONTENT INTO ELEMENTS
    contactListNumber.textContent = `${index + 1}.`;
    contactFullname.textContent = `${contact.contactFirstname} ${contact.contactLastname}`;
    contactPhoneNumber.textContent = contact.contactPhoneNumber;
    contactAddress.textContent = contact.contactAddress;
    deleteButton.innerHTML = "<i class='fa-solid fa-trash-can'></i>";
    editButton.innerHTML = "<i class='fa-solid fa-pencil'></i>";

    //ADDING CLASS TO ELEMENTS
    contactItem.classList.add("contacts-item");
    contactListNumber.classList.add("contacts-item__list-number");
    contactFullname.classList.add("contacts-item__fullname");
    contactPhoneNumber.classList.add("contacts-item__phone");
    contactAddress.classList.add("contacts-item__address");
    contactTools.classList.add("contacts-item__controls");

    // ADD EVENT LISTNERS TO DELETE AND EDIT BUTTON
    deleteButton.addEventListener("click", () => deleteContacts(contact.id));
    editButton.addEventListener("click", (e) => editContacts(e, contact.id));
  });
};

// ADD EVENT LISTENER TO THE CONTACTS
form.addEventListener("submit", addContacts);

// ADD EVENTLISTENER TO THE SEARCH INPUT AND MAKE IT TO
searchInput.addEventListener("input", (e) => {
  const searchQuery = e.target.value.toLowerCase();
  const searchOptionValue = searchOption.value;
  const filteredArray = contacts.filter((contact) => {
    if (searchOptionValue === "firstname") {
      return contact.contactFirstname.toLowerCase().startsWith(searchQuery);
    } else if (searchOptionValue === "lastname") {
      return contact.contactLastname.toLowerCase().startsWith(searchQuery);
    } else if (searchOptionValue === "phone") {
      return contact.contactPhoneNumber.toLowerCase().startsWith(searchQuery);
    } else {
      return;
    }
  });
  renderContacts(filteredArray);
});
