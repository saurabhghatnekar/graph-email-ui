import {addToContacts, getContacts} from "../localstorage";

export const loadContacts = () => {
   return {
    type:"LOAD_CONTACTS",
    payload: getContacts()
   }}

export const addContact = (name, address, currentAccount) => {
    addToContacts(name, address, currentAccount);
    return {
        type: "LOAD_CONTACTS",
        payload: getContacts()
    }
}
