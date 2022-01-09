import {saveCurrentAccount} from "../localstorage";


export const setCurrentAccount = account => {
    saveCurrentAccount(account)
   return {
    type:"SET_CURRENT_ACCOUNT",
    payload: account
}}

