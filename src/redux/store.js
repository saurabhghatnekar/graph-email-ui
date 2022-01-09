import {createStore, applyMiddleware} from "redux";
import logger from "redux-logger";

import rootReducer from './root-reducer'
import {saveState} from "./localstorage";
const middlewares = [logger];

const store = createStore(rootReducer,applyMiddleware(...middlewares));

// store.subscribe(() =>{
//     saveState({
//         currentAccount: store.getState().currentAccount
//     })
// })

export default store;