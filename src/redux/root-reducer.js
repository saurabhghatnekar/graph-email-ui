import {combineReducers} from "redux";

import accountReducer from "./account/account.reducer";
import graphContractReducer from "./contract/contract.reducer";
import contactsReducer from "./contacts/contacts.reducer";

export default combineReducers({
    account: accountReducer,
    contract: graphContractReducer,
    contacts: contactsReducer
});

