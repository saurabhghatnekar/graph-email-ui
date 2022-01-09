import {getContacts} from "../localstorage";

const INITIAL_STATE = {
    contacts: getContacts()
}

const contactsReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOAD_CONTACTS":
            return {
                ...state,
                contacts: action.payload
            }

        default:
            return state
    }
}

export default contactsReducer;