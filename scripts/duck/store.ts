import {
    createStore,
    applyMiddleware,
    combineReducers
} from "redux";

import session from "./session/reducer";


const rootReducer = combineReducers({
    session
});

export default createStore(rootReducer);