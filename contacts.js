const { v4: uuidv4 } = require('uuid');

const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

    async function listContacts() {
        try{
            return JSON.parse(await fs.readFile(contactsPath, "utf-8"));
        }catch(err){
            console.error(error.message);
            process.exit(1);
        }
    }
  
  async function getContactById(contactId) {
    try{
        const data = await listContacts();
        const userByID = data.find(user=>user.id===contactId);
        return userByID;
    }catch(err){
        console.error(error.message);
        process.exit(1);
    }
  }
  
  async function removeContact(contactId) {
    try{
        const data = await listContacts();
        const removedUser = data.filter(user=>user.id !==contactId);
        return removedUser;
    }catch(err){
        console.error(error.message);
        process.exit(1);
    }
  }
  
  async function addContact(name, email, phone) {
    try{
        const data = await listContacts();
        const newUser = {id:uuidv4(),name, email, phone};
        const newUsers = [...data, newUser];
        await fs.writeFile(contactsPath, JSON.stringify(newUsers))
        return newUsers;
    }catch(err){
        console.error(error.message);
        process.exit(1);
    }
  }

  module.exports = { listContacts, getContactById, removeContact, addContact };