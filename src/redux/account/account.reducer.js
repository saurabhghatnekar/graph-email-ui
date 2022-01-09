import {getCurrentAccount} from "../localstorage";

const INITIAL_STATE = {
    currentAccount: getCurrentAccount()
}
const accountReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_CURRENT_ACCOUNT":
            return {
                ...state,
                currentAccount: action.payload
            }
        default:
            return state
    }
}

export default accountReducer;