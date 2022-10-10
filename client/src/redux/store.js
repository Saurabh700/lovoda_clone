import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { reducer as AppReducer } from "./appReducer/reducer";
import { reducer as AuthReducer } from "./authReducer/reducer";
import { reducer as CartReducer } from "./cartReducer/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({ AppReducer, AuthReducer, CartReducer });

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
// const store = legacy_createStore(rootReducer);

export { store };
