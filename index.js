const yargs = require("yargs");
const contactsRepository = require("./db/contacts");


run();

// async function run() {
//    const result =  await contactsRepository.listContacts()
//    console.log(result)
// }

// async function run() {
//   try {
//     const result = await contactsRepository.getContactById("_s8iNCjayhiCsjbHdByXu");
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function run() {
//   try {
//     const result = await contactsRepository.addContact({
//       name: "Vaisya",
//       email:"Puopkin@mail.com",
//       phone: "0991234567",
//     });
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// }

async function run() {
  try {
   const arguments = process.argv;
   const {argv}= yargs(arguments)
   invokeAction(argv)
    
  } catch (error) {
    console.log(error);
  }
}

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactsRepository.listContacts();
      console.log(allContacts);
      break;

    case "get":
      const contact = await contactsRepository.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const createContact = await contactsRepository.addContact({
        name,
        email,
        phone,
      });
      console.log(createContact);
      break;

    case "remove":
      await contactsRepository.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}


