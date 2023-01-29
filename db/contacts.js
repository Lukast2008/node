const fsp = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.JSON");

const updateContacts = async (contacts) =>
  await fsp.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

// TODO: задокументувати кожну функцію
const listContacts = async () => {
  const contacts = await fsp.readFile(contactsPath);
  const result = JSON.parse(contacts);
  return result;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    throw new Error("the contact is not found");
  }
   return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    throw new Error("the contact is not found");
  }
  contacts.splice(index, 1);
  await updateContacts(contacts);
  return contacts[index];
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  await updateContacts(contacts);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
